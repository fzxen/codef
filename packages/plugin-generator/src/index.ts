import { definePlugin } from "@codef/core";
import { templates } from "./templates";
import { logger, download } from "@codef/shared";

export default definePlugin(({ registerCmd }) => {
  registerCmd("create <frame> [name]")
    .description("create a new project")
    .alias("c")
    .action((frame: string, name: string): void => {
      create(frame, name);
    });
});

function create(frame: string, name: string) {
  const frames = templates.map((t) => t.frame);
  if (!frames.includes(frame)) {
    logger.error(
      `${frame} is not support for now! we support ${frames.join(",")}`
    );
    process.exit();
  }

  const repo = templates.find((t) => t.frame === frame)?.repo!;

  console.log("downloading...");

  download(repo, name)
    .then(() => {
      console.log(`download successful\n please open your project: cd ${name}`);
    })
    .catch((err) => {
      if (err) console.error(`download failed!\n${err?.message}`);
    });
}
