import { spawn } from "node:child_process";
import {
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  statSync,
} from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { GALLERY_PORT, MODELS, ROUTES, VIEWPORTS } from "./models.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const modelsRoot = path.resolve(
  process.env.TRIAGE_MODELS_ROOT || path.join(repoRoot, "../triage-wt"),
);
const publicDir = path.join(__dirname, "public");
const logDir = process.env.TRIAGE_WALL_LOG_DIR || "/tmp/opencode";
const galleryPort = Number(process.env.GALLERY_PORT || GALLERY_PORT);
const host = "127.0.0.1";

mkdirSync(logDir, { recursive: true });

const statuses = new Map(
  MODELS.map((model) => [
    model.id,
    {
      id: model.id,
      label: model.label,
      port: model.port,
      url: `http://${host}:${model.port}`,
      status: "starting",
      error: null,
    },
  ]),
);

const children = [];
let shuttingDown = false;

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

function sendJson(response, value) {
  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(value));
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": mimeTypes.get(extension) || "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
}

function serveStatic(response, pathname) {
  const relative =
    pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(publicDir, relative);
  const publicPrefix = `${publicDir}${path.sep}`;

  if (filePath !== publicDir && !filePath.startsWith(publicPrefix)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  sendFile(response, filePath);
}

const server = createServer((request, response) => {
  const requestUrl = new URL(
    request.url || "/",
    `http://${request.headers.host || host}`,
  );

  if (requestUrl.pathname === "/api/config") {
    sendJson(response, {
      galleryPort,
      models: MODELS,
      routes: ROUTES,
      viewports: VIEWPORTS,
    });
    return;
  }

  if (requestUrl.pathname === "/api/status") {
    sendJson(response, { models: [...statuses.values()] });
    return;
  }

  serveStatic(response, requestUrl.pathname);
});

function setStatus(id, patch) {
  const current = statuses.get(id);
  if (!current) return;
  statuses.set(id, { ...current, ...patch });
}

async function waitForModel(model) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline && !shuttingDown) {
    if (statuses.get(model.id)?.status === "error") return;

    try {
      const response = await fetch(`http://${host}:${model.port}/`, {
        signal: AbortSignal.timeout(1_500),
      });
      if (response.ok) {
        setStatus(model.id, { status: "ready", error: null });
        return;
      }
    } catch {
      // Vite is still booting.
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
  }

  if (!shuttingDown) {
    setStatus(model.id, {
      status: "error",
      error: `Timed out waiting for http://${host}:${model.port}. See ${path.join(logDir, `design-wall-${model.id}.log`)}.`,
    });
  }
}

function startModel(model) {
  const modelDir = path.join(modelsRoot, model.root || model.id);
  const clientDir = path.join(modelDir, "apps/client");
  const viteBin = path.join(clientDir, "node_modules/.bin/vite");

  if (!existsSync(viteBin)) {
    setStatus(model.id, {
      status: "error",
      error: `Vite was not found at ${viteBin}. Install client dependencies in ${modelDir}.`,
    });
    return;
  }

  const logPath = path.join(logDir, `design-wall-${model.id}.log`);
  const logStream = createWriteStream(logPath, { flags: "w" });
  const child = spawn(
    viteBin,
    ["--host", host, "--port", String(model.port), "--strictPort"],
    {
      cwd: clientDir,
      env: { ...process.env, BROWSER: "none" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  children.push(child);
  child.stdout.pipe(logStream);
  child.stderr.pipe(logStream);

  child.on("exit", (code, signal) => {
    logStream.end();
    if (shuttingDown) return;
    setStatus(model.id, {
      status: "error",
      error: `Vite exited early (${signal || `code ${code}`}). See ${logPath}.`,
    });
  });

  void waitForModel(model);
}

function printSummary() {
  const rows = [...statuses.values()].map((status) => {
    const badge =
      status.status === "ready"
        ? "ready"
        : status.status === "error"
          ? "error"
          : "starting";
    return `  ${status.label.padEnd(12)} http://${host}:${status.port}  ${badge}`;
  });

  console.log(`\nTriage design wall\n  http://${host}:${galleryPort}\n`);
  console.log(rows.join("\n"));
  console.log(`\nModel sources: ${modelsRoot}`);
  console.log(`Logs: ${logDir}/design-wall-*.log`);
  console.log("Press Ctrl+C to stop the wall and all model servers.\n");
}

function shutdown(reason) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\nStopping design wall (${reason})...`);

  for (const child of children) {
    try {
      child.kill("SIGTERM");
    } catch {
      // The child may already be gone.
    }
  }

  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

server.on("error", (error) => {
  console.error(
    `Could not start the design wall on http://${host}:${galleryPort}.`,
  );
  console.error(error.message);
  process.exit(1);
});

server.listen(galleryPort, host, () => {
  printSummary();
  for (const model of MODELS) startModel(model);
});
