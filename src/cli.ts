import { Command } from "commander";
const pkg = require("../package.json");
import { create } from "./index";
import { repoName } from "./templates";
import logger from "./logger";

const program = new Command();

program
  .command("create <frame> [name]")
  .description("create a new project")
  .alias("c")
  .action((frame: string, name: string): void => {
    create(frame, name);
  });

program
  .command("list")
  .description("show supported repo list")
  .alias("ls")
  .action(() => {
    logger.plain("support for:");
    logger.notice(`- ${repoName.join("\n- ")}`);
  });

program.version(pkg.version, "-v version").parse(process.argv);
