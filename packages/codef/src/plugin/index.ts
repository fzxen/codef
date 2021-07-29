import { registerCommand } from "../cli";

type RegisterCommandType = typeof registerCommand;

interface PluginCreatorContext {
  registerCommand: RegisterCommandType;
}

export type PluginCreator<T = unknown> = (
  context: PluginCreatorContext,
  options?: T
) => void;

export function definePlugin<T>(creator: PluginCreator<T>) {
  function install(opts?: T) {
    return () => creator({ registerCommand }, opts);
  }
  return { install };
}
