import {
  buildLlmsFullTxt,
  generateContent
} from "./chunk-USMSV34Q.js";

// src/nuxt.ts
import { defineNuxtModule, useLogger } from "@nuxt/kit";
import { mkdirSync, writeFileSync } from "fs";
import { join, resolve } from "path";
var nuxt_default = defineNuxtModule({
  meta: {
    name: "nuxt-llms-txt",
    configKey: "llmsTxt"
  },
  setup(options, nuxt) {
    if (!options.title) {
      throw new Error("[nuxt-llms-txt] `title` is required.");
    }
    const logger = useLogger("nuxt-llms-txt");
    const filename = options.filename ?? "llms.txt";
    const stagingDir = join(nuxt.options.buildDir, "llms-txt");
    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.publicAssets ?? (nitroConfig.publicAssets = []);
      nitroConfig.publicAssets.push({
        dir: stagingDir,
        maxAge: 0
      });
    });
    nuxt.hook("nitro:build:before", () => {
      const content = generateContent(options);
      mkdirSync(stagingDir, { recursive: true });
      writeFileSync(join(stagingDir, filename), content, "utf-8");
      logger.success(`Generated ${filename}`);
    });
    if (options.full !== false) {
      const fullConfig = options.full ?? {};
      const publicDir = options.outDir ? resolve(nuxt.options.rootDir, options.outDir) : resolve(nuxt.options.rootDir, ".output", "public");
      nuxt.hook("generate:done", async () => {
        await buildLlmsFullTxt(publicDir, options, fullConfig);
        logger.success(`Generated ${fullConfig.filename ?? "llms-full.txt"}`);
      });
    }
  }
});
export {
  nuxt_default as default
};
