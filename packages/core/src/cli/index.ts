import { Command } from "commander";
const pkg = require("../../package.json");

const cli = new Command();

cli.version(pkg.version, "-v version").parse(process.argv);

interface CliCommand {
  command: string;
  description?: string;
  alias?: string;
  action: (...args: any[]) => void;
}
export function registerCommand({
  command,
  description = "",
  alias = "",
  action,
}: CliCommand) {
  cli.command(command).description(description).alias(alias).action(action);
}

// export function registerPlugin() {}

export interface PluginCreatorContext {
  registerCommand: typeof registerCommand;
}
