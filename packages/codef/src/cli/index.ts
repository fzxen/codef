import { Command } from "commander";
const pkg = require("../package.json");

const cli = new Command();

cli.version(pkg.version, "-v version").parse(process.argv);

interface CliCommand {}
export function registerCommand(command: CliCommand) {}

export function registerPlugin() {}

