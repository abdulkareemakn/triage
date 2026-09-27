import { registerHooks } from "node:module";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

    const directory = context.parentURL.includes("/dist/") ? "dist" : "src";
    const extension = directory === "dist" ? ".js" : ".ts";
    return nextResolve(
      pathToFileURL(
        resolve(root, directory, `${specifier.slice(2)}${extension}`),
      ).href,
      context,
    );
  },
});
