#!/usr/bin/env node
import { writeFile } from "fs/promises";
import { execSync } from "node:child_process";
import pkg from "../../../package.json" with { type: "json" };

const files = pkg.openapiFiles || [];

const launch = async (files) => {
  await Promise.all(
    files.map(async ({ input, output, swagger }) => {
      console.info("🚀 Fetching OpenAPI from", input);
      const response = await fetch(input);
      const json = await response.json();
      console.info("📦 Writing OpenAPI to", swagger);
      await writeFile(swagger, JSON.stringify(json, null, 2), "utf8");
      console.info("🔨 Generating TypeScript client to", output);
      execSync(`openapi-typescript ${swagger} -o ${output}`);
    }),
  );
};
launch(files);
