interface Repo {
  name: string;
  action: () => string | undefined;
}

const repos: Repo[] = [
  {
    name: "vue3-webpack",
    action: () => "https://github.com/zxffan/vue3-webpack",
  },
  {
    name: "vue2-ssr",
    action: () => "https://github.com/zxffan/vue2-ssr",
  },
  {
    name: "vue3-ssr",
    action: () => "https://github.com/zxffan/vue3-ssr",
  },
];

export function addRepo(name: string, action: Repo["action"]) {
  repos.push({
    name,
    action,
  });
}

export function getRepos() {
  return repos;
}
