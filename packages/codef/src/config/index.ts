export interface CliConfig {
  plugins?: Array<() => void>;
}

export function loadConfig(): Required<CliConfig> {
  const configPath = `${process.cwd()}/codef.config.ts`;
  let config: CliConfig | undefined;
  try {
    config = require(configPath) as CliConfig;
  } catch {
    // TODO log 没有配置文件
  }
  return richConfig(config);
}

// type annotation
export function defineConfig(config: CliConfig): CliConfig {
  return config;
}

function richConfig(config?: CliConfig): Required<CliConfig> {
  return {
    plugins: [],
    ...config,
  };
}
