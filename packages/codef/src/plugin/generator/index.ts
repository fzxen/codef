import { definePlugin } from "../definePlugin";
import { getRepos } from "./repos";
import { logger } from "@codef/shared";
import download from "./download";

export default definePlugin(({ registerCommand }) => {
  registerCommand({
    command: "create",
    args: [
      {
        name: "[template]",
        description: "chose a template you want",
      },
      {
        name: "[name]",
        description: "your project name",
      },
    ],
    description: "create a new project",
    alias: "c",
    action(template: string, name: string) {
      create(template, name);
    },
  });

  registerCommand({
    command: "list",
    alias: "ls",
    description: "list supported template",
    action() {
      const repos = getRepos();
      const repoNames = repos.map((r) => r.name);
      logger.notice(repoNames.join("\n"));
    },
  });
});

function create(template: string, name: string) {
  const repos = getRepos();
  const repoNames = repos.map((r) => r.name);
  const repo = repos.find((repo) => repo.name === name);

  if (!repo) {
    logger.error(
      `${template} is not support for now! we support ${repoNames.join(",")}`
    );
    process.exit();
  }

  const repoUrl = repo.action();

  if (typeof repoUrl !== "string") return;

  console.log("downloading...");

  download(repoUrl, name)
    .then(() => {
      console.log(`download successful\n please open your project: cd ${name}`);
    })
    .catch((err) => {
      if (err) console.error(`download failed!\n${err?.message}`);
    });
}
