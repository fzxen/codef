import { registerCommand } from "../cli";
import { addRepo } from "./generator/repos";

interface PluginCreatorContext {
  registerCommand: typeof registerCommand;
  addRepo: typeof addRepo;
}

export type PluginCreator<T = unknown> = (
  context: PluginCreatorContext,
  options?: T
) => void;

const context: PluginCreatorContext = {
  registerCommand,
  addRepo,
};

export function definePlugin<T>(creator: PluginCreator<T>) {
  function install(opts?: T) {
    return () => creator(context, opts);
  }
  return { install };
}
