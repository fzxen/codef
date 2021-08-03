import { Command } from "commander";
import { createCommandRegister } from "./registerCommand";

const { version } = getPkgInfo();

const cli = new Command();

cli.version(version, "-v version");

export const registerCommand = createCommandRegister(cli);

export function parseEnv(argv: string[]) {
  cli.parse(argv);
}

function getPkgInfo() {
  try {
    return require("../../package.json")?.version;
  } catch {
    return {
      version: "unknown",
    };
  }
}
