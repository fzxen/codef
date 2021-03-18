import { Command } from "commander";
const pkg = require("../package.json");
import { create } from "./index";

const program = new Command();

program
  .command("create <frame> [name]")
  .description("create a new project")
  .alias("c")
  .action((frame: string, name: string): void => {
    create(frame, name);
  });

program.version(pkg.version, "-v version").parse(process.argv);
