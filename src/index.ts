import download from "./download";
import ora from "ora";
import templates from "./templates";

export function create(frame: string, name: string) {
  const frames = templates.map((t) => t.frame);
  if (!frames.includes(frame)) {
    console.error(
      `${frame} is not support for now! we support ${frames.join(",")}`
    );
    process.exit();
  }

  const repo = templates.find((t) => t.frame === frame)?.repo!;

  const spinner = ora("downloading...").start();

  download(repo, name)
    .then(() => {
      spinner.succeed(
        `download successful\n please open your project: cd ${name}`
      );
    })
    .catch((err) => {
      if (err) spinner.fail(`download failed!\n${err?.message}`);
    });
}
