import type { Command } from "commander";

interface CliCommandArgument {
  name: string;
  description: string;
  defaultValue?: string;
}

export interface CliCommand {
  command: string;
  args?: Array<CliCommandArgument>;
  description?: string;
  alias?: string;
  action: (...args: any[]) => void;
}

const commandNames: string[] = [];

export function createCommandRegister(cli: Command) {
  return function registerCommand({
    command,
    args = [],
    description,
    alias,
    action,
  }: CliCommand) {
    if (commandNames.includes(command)) {
      throw new Error(`${command} is already exists`);
    }

    const cmd = cli.command(command);

    args.forEach(({ name, description, defaultValue }) =>
      cmd.argument(name, description, defaultValue)
    );

    if (description) cmd.description(description);

    if (alias) cmd.alias(alias);

    cmd.action(action);
  };
}
