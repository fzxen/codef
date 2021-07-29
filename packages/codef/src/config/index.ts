import { spawn } from "child_process";
import {} from "ts-node";

interface CliConfig {
  plugins?: Array<() => void>;
}

export async function loadConfig(): CliConfig {
  const configPath = `${process.cwd()}/codef.config.ts`;
  // spawn();
}

export function defineConfig(config: CliConfig) {
  return config;
}
