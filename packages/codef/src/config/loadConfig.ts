import type { CliConfig } from "./type";
import { spawn } from "child_process";
import fs from "fs/promises";
import { logger } from "../../../shared/dist";
import nodePath from "path";

const configDir = nodePath.join(process.cwd(), "./.code.config");

export async function loadConfig(): Promise<Required<CliConfig>> {
  const file = await getConfigFilePath();

  if (file === undefined) return richConfig();

  const { path, jsPath } = file;
  await buildTs(path);
  const config = require(jsPath)?.default as CliConfig;

  await fs.rm(configDir, {
    force: true,
    recursive: true,
  });

  return richConfig(config);
}

async function getConfigFilePath() {
  const configPath = nodePath.join(process.cwd(), "codef.config");
  const jsPath = nodePath.join(configDir, "codef.config.js");
  try {
    await fs.access(configPath + ".ts");

    return {
      jsPath,
      path: configPath + ".ts",
      isTs: true,
    };
  } catch {}

  try {
    await fs.access(configPath + ".js");

    return {
      jsPath,
      path: configPath + ".js",
      isTs: false,
    };
  } catch {}
}

function richConfig(config?: CliConfig): Required<CliConfig> {
  return {
    plugins: [],
    ...(config ?? {}),
  };
}

function buildTs(path: string) {
  return new Promise((resolve, reject) => {
    const process = spawn("tsc", [
      path,
      "--outDir",
      configDir,
      "--module",
      "commonjs",
      "--allowJs",
    ]);

    process.on("exit", resolve);

    process.on("error", (err) => {
      logger.error(err.message);
      reject(err);
    });
  });
}
