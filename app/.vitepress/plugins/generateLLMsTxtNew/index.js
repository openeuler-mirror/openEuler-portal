import {
  buildLlmsFullTxt,
  generateContent
} from "./chunk-USMSV34Q.js";

// src/index.ts
import { writeFileSync, mkdirSync } from "fs";
import { resolve, join } from "path";
function viteLlmsTxt(options) {
  if (!options?.title) {
    throw new Error("[vite-plugin-llms-txt] `title` is required.");
  }
  let config;
  return {
    name: "vite-plugin-llms-txt",
    // Run only during production builds
    apply: "build",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    // Write the file after all chunks have been emitted
    closeBundle() {
      const filename = options.filename ?? "llms.txt";
      const outDir = options.outDir ? resolve(config.root, options.outDir) : resolve(config.root, config.build.outDir);
      const content = generateContent(options);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, filename), content, "utf-8");
      config.logger.info(
        `\x1B[32m\u2713\x1B[0m \x1B[2m[llms-txt]\x1B[0m generated \x1B[36m${join(outDir, filename)}\x1B[0m`
      );
    }
  };
}
var index_default = viteLlmsTxt;
export {
  buildLlmsFullTxt,
  index_default as default,
  viteLlmsTxt
};
