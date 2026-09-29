---
title: Railway
description: Deploy the application, MongoDB, and private file storage to Railway from GitHub using infrastructure as code.
---

# Railway

This starter kit deploys to Railway as one web service, one MongoDB service with a
persistent volume, and one private S3-compatible bucket. Express serves the built
React app and `/api` from the same HTTPS origin. Railway builds the repository's
`Dockerfile`; the frontend does not need a separate hosting service.

Triage already has a Railway project. The setup commands below document the
starter path for a new environment; inspect Triage's current `.railway/railway.ts`
and `.railway/README.md` before planning any change to the existing deployment.

Infrastructure as code (IaC) describes the resources in a TypeScript file. The
Railway CLI previews changes before applying them. Application secrets remain in
Railway, while database and bucket references connect the resources automatically.

## Before you deploy

1. Create a Railway account, connect GitHub, and install the Railway GitHub App
   with access to the application's repository. Accept any pending permission
   updates in [GitHub's installation settings](https://github.com/settings/installations).
2. Select **Singapore** as the preferred deployment region in the Railway
   dashboard before creating resources, where the account's plan permits it.
   The bucket example below explicitly selects Singapore with `sin`.
3. Clone the application repository that will be deployed. Triage already has its
   own repository and deployment; do not initialize another project for routine
   application work.
4. Install dependencies with `pnpm install`. The root development dependencies
   include `@railway/cli` and the `railway` IaC SDK.
5. Set up Resend and have its API key ready.

Triage retains the starter's `docs/` directory as development guidance. Replace
the starter landing page when building Triage's own UI; see
[Development workflow](/installation/development-workflow/#replace-the-starter-landing-page).

!!! note "Free plan and usage"

    Railway Free includes a small monthly usage credit. This should be enough for our use case but isn't enough to actually run this application in production. Check
    [current pricing](https://railway.com/pricing) and usage in the dashboard.

## Create and describe the project

Run all commands from the application's repository root:

```sh
pnpm exec railway login
pnpm exec railway init --name your-app
pnpm exec railway config init
```

`init` creates and links a fresh Railway project.
Replace the generated authoring file with the following example. Replace
`YOUR_OWNER/YOUR_REPO` with the application's GitHub repository and `your-app` with
its project name.

```ts title=".railway/railway.ts"
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
  database.variables = {
    GLIBC_TUNABLES: { type: "literal", value: "glibc.pthread.rseq=1" },
  };
  const uploads = bucket("uploads", { region: "sin" });
  const web = service("web", {
    source: github("YOUR_OWNER/YOUR_REPO", {
      branch: "main",
      checkSuites: true,
    }),
    build: { builder: "DOCKERFILE", dockerfilePath: "Dockerfile" },
    healthcheck: "/api/health",
    deploy: { sleepApplication: true },
    env: {
      PORT: "8080",
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

  return project("your-app", { resources: [database, uploads, web] });
});
```

The MongoDB helper provisions the database and its persistent volume. Its connection
reference uses Railway's private network. Keep MongoDB private; only the web service
needs a public domain. The bucket is a separate storage resource, not a process
inside the application container.

The MongoDB configuration includes `GLIBC_TUNABLES=glibc.pthread.rseq=1` to address
its Linux kernel 6.19+ startup incompatibility on Railway. This is the workaround
verified in the deployment. Track the
[MongoDB issue](https://jira.mongodb.org/browse/SERVER-121912) for a permanent fix.

`preserve()` retains values configured outside IaC without committing them to source.

`checkSuites: true` enables **Wait for CI**. The existing Docker workflow runs on
pushes and invokes the checks workflow. Railway waits for GitHub Actions check
suites before deploying; a failed workflow prevents deployment. Ensure the Railway
GitHub App has the required permissions. See
[Railway's CI requirements](https://docs.railway.com/deployments/github-autodeploys#wait-for-ci)
for cancellation and timeout behavior.

Preview and apply the configuration:

```sh
pnpm exec railway config plan
pnpm exec railway config apply
```

Review every change. The initial plan should create MongoDB, the bucket, and the web
service without deleting anything. Commit `.railway/` and push it to GitHub.
Subsequent infrastructure edits require another plan and apply; pushing the authoring
file alone does not apply its resource changes. GitHub pushes deploy application code.

The first app deployment can fail while required production settings are missing.
Continue with the next section, then redeploy. Do not remove configuration validation
to make an incomplete deployment pass.

## Configure the public URL and secrets

Create a Railway domain for the web service:

```sh
pnpm exec railway domain --service web --port 8080
```

IaC sets `PORT=8080`, and the domain targets the same port. The server honors
`PORT`; the Dockerfile sets `NODE_ENV=production`.

Set these variables on **web** using the returned HTTPS URL:

| Variable             | Required value                                   |
| -------------------- | ------------------------------------------------ |
| `APP_URL`            | The public HTTPS origin, without a path          |
| `BETTER_AUTH_URL`    | Exactly the same origin as `APP_URL`             |
| `BETTER_AUTH_SECRET` | A unique random secret of at least 32 characters |
| `RESEND_API_KEY`     | The application's Resend API key                 |

Use Railway's dashboard Variables tab or its CLI editor:

```sh
pnpm exec railway variable edit --service web --skip-deploys
```

The editor uses the shell's configured `EDITOR`. It shows a redacted diff before
applying. To generate and set the authentication secret without printing it, run:

```sh
node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('base64'))" | pnpm exec railway variable set BETTER_AUTH_SECRET --stdin --service web --skip-deploys
```

Generate it once for the environment. Replacing it later invalidates existing sessions.
`--skip-deploys` avoids starting a deployment for each individual setting.

IaC supplies `MONGODB_URI` and all five storage variables automatically. Do not copy
bucket access keys manually. Storage limits, allowed MIME types, and proxy settings
are described in [Development workflow](/installation/development-workflow/#environment-variables).
The local test database and MailDev settings are not production requirements.

Redeploy after completing the settings:

```sh
pnpm exec railway redeploy --service web --from-source --yes
```

## Allow browser access to the bucket

Direct browser uploads and downloads use presigned URLs. Configure the bucket's
CORS policy to allow the application's origin, `PUT` and `GET`, and `Content-Type`.
The bucket remains private; CORS does not grant unauthenticated object access.

Railway supports configuring CORS through the S3 API. A dashboard CORS control is
not required. The following command uses the application's installed AWS SDK,
injects the web service's variables into a local process, and preserves existing
rules. It does not print credentials. Run it only on a trusted computer.

```sh
pnpm exec railway run --service web --no-local -- node --input-type=module -e '
import { createRequire } from "node:module";
const require = createRequire(new URL("./apps/server/package.json", import.meta.url));
const { S3Client, GetBucketCorsCommand, PutBucketCorsCommand } = require("@aws-sdk/client-s3");
const env = process.env;
const client = new S3Client({
  endpoint: env.STORAGE_ENDPOINT,
  region: env.STORAGE_REGION,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY_ID,
    secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
  },
});
const matches = (rule) =>
  rule.AllowedOrigins?.includes(env.APP_URL) &&
  ["PUT", "GET"].every((method) => rule.AllowedMethods?.includes(method)) &&
  rule.AllowedHeaders?.some((header) =>
    header === "*" || header.toLowerCase() === "content-type");
try {
  let rules = [];
  try {
    rules = (await client.send(new GetBucketCorsCommand({
      Bucket: env.STORAGE_BUCKET,
    }))).CORSRules ?? [];
  } catch (error) {
    if (!["NoSuchCORSConfiguration", "NoSuchCORS"].includes(error.name)) throw error;
  }
  if (!rules.some(matches)) {
    rules.push({
      AllowedOrigins: [env.APP_URL],
      AllowedMethods: ["PUT", "GET"],
      AllowedHeaders: ["Content-Type"],
      MaxAgeSeconds: 3600,
    });
    await client.send(new PutBucketCorsCommand({
      Bucket: env.STORAGE_BUCKET,
      CORSConfiguration: { CORSRules: rules },
    }));
  }
  const saved = await client.send(new GetBucketCorsCommand({ Bucket: env.STORAGE_BUCKET }));
  if (!saved.CORSRules?.some(matches)) throw new Error("CORS verification failed");
  console.log("Bucket CORS configured and verified.");
} catch (error) {
  console.error("Bucket CORS failed:", error.name);
  process.exitCode = 1;
} finally {
  client.destroy();
}
'
```

The endpoint and URL style in the bucket's Credentials tab are authoritative.
New Railway buckets normally use virtual-hosted URLs. The pilot also verified
bucket access with this starter's existing path-style S3 client. Verify the complete
[upload, confirmation, and private download sequence](/build/file-uploads/#verify-and-troubleshoot),
not just the presence of variables. Repeat CORS configuration when the public origin
changes or a new environment gets its own bucket.

## Verify the deployment

```sh
pnpm exec railway deployment list --service web --json
pnpm exec railway deployment list --service mongodb --json
curl https://your-app.up.railway.app/api/health
```

Replace the example URL with the application's domain. Confirm both deployments
reach `SUCCESS`, the homepage responds, and `/api/health` returns HTTP 200 with
`{"status":"ok"}`. The health endpoint checks the live MongoDB connection.
A successful build or deployment status alone does not establish public reachability.

Create an account, sign in, and exercise a protected API route. Verify file upload,
confirmation, and private download, and test delivery from a verified Resend sending
domain for application features that send email. Inspect Railway usage and arrange
backups for persistent data before relying on the deployment.

## References

- [Railway infrastructure as code](https://docs.railway.com/infrastructure-as-code)
- [Railway GitHub autodeploys and Wait for CI](https://docs.railway.com/deployments/github-autodeploys)
- [Railway bucket references](https://docs.railway.com/storage-buckets#variable-references)
- [Railway bucket uploads and CORS](https://docs.railway.com/storage-buckets/uploading-serving)
- [Railway CDN](https://docs.railway.com/networking/cdn)
- [Railway pricing](https://railway.com/pricing)
- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
