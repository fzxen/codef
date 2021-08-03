import { parseEnv } from "./cli";
import { loadConfig, defineConfig } from "./config";
import { definePlugin, generatorPlugin } from "./plugin";

export { defineConfig, definePlugin };

init();

async function init() {
  const config = await loadConfig();

  // run config
  function registerPlugins() {
    const plugins = [...getInsetPlugin(), ...config.plugins];
    plugins.forEach((pluginCreator) => {
      try {
        pluginCreator();
      } catch {
        // TODO log 某一个plugin 异常
      }
    });
  }

  function getInsetPlugin() {
    return [generatorPlugin.install()];
  }

  registerPlugins();

  parseEnv(process.argv);
}
