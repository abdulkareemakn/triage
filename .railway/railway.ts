import {
  bucket,
  defineRailway,
  github,
  mongo,
  preserve,
  project,
  ref,
  service,
} from "railway/iac";

export default defineRailway(() => {
  const database = Object.assign(mongo("mongodb"), {
    deploy: { sleepApplication: true },
  });
  const uploads = bucket("uploads", { region: "sin" });
  const web = service("web", {
    source: github("abdulkareemakn/triage", { branch: "main" }),
    build: { builder: "DOCKERFILE", dockerfilePath: "Dockerfile" },
    healthcheck: "/api/health",
    deploy: { sleepApplication: true },
    env: {
      MONGODB_URI: database.env.MONGO_URL,
      APP_URL: preserve(),
      BETTER_AUTH_URL: preserve(),
      BETTER_AUTH_SECRET: preserve(),
      RESEND_API_KEY: preserve(),
      STORAGE_ENDPOINT: ref(uploads, "ENDPOINT"),
      STORAGE_REGION: ref(uploads, "REGION"),
      STORAGE_BUCKET: ref(uploads, "BUCKET"),
      STORAGE_ACCESS_KEY_ID: ref(uploads, "ACCESS_KEY_ID"),
      STORAGE_SECRET_ACCESS_KEY: ref(uploads, "SECRET_ACCESS_KEY"),
    },
  });

  return project("triage", { resources: [database, uploads, web] });
});
