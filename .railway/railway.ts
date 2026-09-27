import {
  bucket,
  defineRailway,
  github,
  mongo,
  project,
  service,
} from "railway/iac";

export default defineRailway(() => {
  const database = mongo("mongodb");
  const uploads = bucket("uploads", { region: "sin" });
  const web = service("web", {
    source: github("abdulkareemakn/triage", { branch: "main" }),
    build: { builder: "DOCKERFILE", dockerfilePath: "Dockerfile" },
    healthcheck: "/api/health",
    deploy: { sleepApplication: true },
    env: { MONGODB_URI: database.env.MONGO_URL },
  });

  return project("triage", { resources: [database, uploads, web] });
});
