import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

function logsApi(): Plugin {
  return {
    name: "show-some-work-logs-api",
    configureServer(server) {
      server.middlewares.use("/api/logs", (request, response, next) => {
        if (request.method !== "POST") {
          next();
          return;
        }

        let body = "";

        request.on("data", (chunk) => {
          body += chunk;
        });

        request.on("end", () => {
          try {
            const logs = JSON.parse(body);

            if (!Array.isArray(logs)) {
              throw new Error("Expected logs array");
            }

            const logsPath = path.resolve(server.config.root, "src/content/logs.json");
            fs.writeFileSync(logsPath, `${JSON.stringify(logs, null, 2)}\n`);

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ ok: true }));
          } catch (error) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");
            response.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : "Invalid logs payload",
              }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "./",
  plugins: [react(), logsApi()],
});
