import type { CliConfig } from "./type";

// type annotation
export function defineConfig(config: CliConfig): CliConfig {
  return config;
}

export { loadConfig } from "./loadConfig";
