import type { PluginCreatorContext } from "../cli";

export type PluginCreator<T = unknown> = (
  context: PluginCreatorContext,
  options?: T
) => void;

export function definePlugin<T>(creator: PluginCreator<T>) {
  function install(opts?: T) {
    return (context: PluginCreatorContext) => creator(context, opts);
  }
  return { install };
}
