import { spawn } from "child_process";
import { existsSync } from "fs";
import { rm } from "fs/promises";
import path from "path";

export default function download(repo: string, name: string) {
  const destination = path.resolve(process.cwd(), name);
  if (existsSync(destination))
    return Promise.reject(new Error(`folder ${name} is existed!`));

  const { url, branch } = normalize(repo);
  return downloadGit(url, destination, { branch });
}

function normalize(repo: string) {
  let regex = /^(?:([^#]+)(?:#(.+))?)$/;
  const directMatch = regex.exec(repo);

  if (directMatch === null) throw new Error(`wrong repo url: ${repo}`);

  const [_, url, branch = "main"] = directMatch;

  return {
    url,
    branch,
  };
}

interface DownloadGitOptions {
  branch?: string;
  delGit?: boolean;
}
function downloadGit(
  url: string,
  destination: string,
  opts: DownloadGitOptions = {}
) {
  return new Promise<void>((resolve, reject) => {
    const { branch, delGit } = Object.assign({ delGit: true }, opts);

    const process = spawn("git", [
      "clone",
      "--depth",
      "1",
      "--",
      url,
      destination,
    ]);

    process.on("exit", (code) => {
      if (code !== 0) return reject(new Error(`git clone failed: ${code}`));
      checkout(branch).then(deleteGitInfo).then(resolve).catch(reject);
    });

    function checkout(branch?: string) {
      return new Promise<void>((resolve, reject) => {
        if (branch === undefined) return resolve();
        const args = ["switch", branch];
        const process = spawn("git", args, { cwd: destination });
        process.on("close", function (code) {
          code === 0
            ? resolve()
            : reject(new Error(`branch switch to ${branch} failed: ${code}`));
        });
      });
    }

    function deleteGitInfo() {
      if (!delGit) return resolve();
      const dotGit = path.resolve(destination, ".git");
      console.log(dotGit);

      return rm(dotGit, { recursive: true, force: true });
    }
  });
}
