import logSymbol from "log-symbols";
import downloadGit from "download-git-repo";
import ora from "ora";
import templates from "./templates";

export function create(frame: string, name: string) {
  const frames = templates.map((t) => t.frame);
  if (!frames.includes(frame)) {
    console.log(
      logSymbol.error,
      `${frame} is not support for now! we support ${frames.join(",")}`
    );
    process.exit();
  }

  const repo = templates.find((t) => t.frame === frame)?.repo!;

  const spinner = ora("downloading...").start();

  downloadGit(repo, name, { clone: true }, (err) => {
    if (err) spinner.fail(`download failed!\n${err}`);
    else
      spinner.succeed(
        `download successful\n please open your project: cd ${name}`
      );
  });
}
