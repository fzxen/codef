#!/usr/bin/env node
import { loadConfig, registerCommand } from "@codef/core";
import generatorPlugin from "@codef/plugin-generator";

const config = loadConfig();

const pluginContext = {
  registerCommand,
};

// run config
function registerPlugins() {
  config.plugins.unshift(...getInsetPlugin());
  config.plugins.forEach((pluginCreator) => {
    try {
      pluginCreator(pluginContext);
    } catch {
      // TODO log 某一个plugin 异常
    }
  });
}

function getInsetPlugin() {
  return [generatorPlugin.install()];
}

registerPlugins();
