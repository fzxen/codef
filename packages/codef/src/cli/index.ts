import { Command } from "commander";
import { createCommandRegister } from "./registerCommand";
const pkg = require("../../package.json");

const cli = new Command();

cli.version(pkg.version, "-v version");

export const registerCommand = createCommandRegister(cli);

export function parseEnv(argv: string[]) {
  cli.parse(argv);
}
