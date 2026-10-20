import { randomBytes, randomUUID } from "node:crypto";

import mongoose from "mongoose";
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import { createApp } from "../../apps/server/src/app.ts";
import { createAuth } from "../../apps/server/src/auth.ts";
import { readConfig } from "../../apps/server/src/config.ts";
import {
  connectDatabase,
  disconnectDatabase,
} from "../../apps/server/src/database.ts";
import { WaitlistEntry } from "../../apps/server/src/models/waitlist-entry.ts";

const config = readConfig({
  NODE_ENV: "test",
  TEST_MONGODB_URI: process.env.TEST_MONGODB_URI,
  APP_URL: "http://localhost:3000",
  BETTER_AUTH_URL: "http://localhost:3000",
  BETTER_AUTH_SECRET: randomBytes(32).toString("hex"),
});
const dbName = `mern_test_${randomUUID().replaceAll("-", "")}`;
let app: ReturnType<typeof createApp>;

beforeAll(async () => {
  await connectDatabase(config.mongodbUri, dbName);
  app = createApp(createAuth(config), config);
});

beforeEach(async () => {
  await WaitlistEntry.deleteMany({});
});

afterAll(async () => {
  if (mongoose.connection.name === dbName)
    await mongoose.connection.dropDatabase();
  await disconnectDatabase();
});

describe("waitlist API", () => {
  test.each([
    { email: "" },
    { email: "not-an-email" },
    { email: "person@example" },
    { email: "person@example.com", extra: true },
  ])("rejects an invalid submission %j", async (body) => {
    const response = await request(app).post("/api/waitlist").send(body);
    expect(response.status).toBe(400);
    expect(response.body.details.fieldErrors).toBeDefined();
    expect(await WaitlistEntry.countDocuments()).toBe(0);
  });

  test("rejects an email longer than 254 characters", async () => {
    const response = await request(app)
      .post("/api/waitlist")
      .send({ email: `${"a".repeat(243)}@example.com` });
    expect(response.status).toBe(400);
    expect(response.body.details.fieldErrors.email).toBeDefined();
  });

  test("stores a normalized email without a session", async () => {
    const response = await request(app)
      .post("/api/waitlist")
      .send({ email: "  Person@Example.COM  " });

    expect(response.status).toBe(201);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body).toEqual({ status: "joined" });
    expect(await WaitlistEntry.findOne().lean()).toMatchObject({
      email: "person@example.com",
      createdAt: expect.any(Date),
    });
  });

  test("treats a repeat submission as joined without creating a duplicate", async () => {
    const first = await request(app)
      .post("/api/waitlist")
      .send({ email: "person@example.com" });
    const second = await request(app)
      .post("/api/waitlist")
      .send({ email: "PERSON@example.com" });

    expect(first.status).toBe(201);
    expect(second.status).toBe(200);
    expect(second.body).toEqual({ status: "joined" });
    expect(await WaitlistEntry.countDocuments()).toBe(1);
  });
});
