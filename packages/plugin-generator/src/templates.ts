const repos = [
  {
    frame: "electron-vue",
    repo: "https://gitee.com/zxffan/electron-vue3.git#electron-vue",
  },
  {
    frame: "vue3-webpack",
    repo: "https://github.com/zxffan/vue3-webpack",
  },
  {
    frame: "vue2-ssr",
    repo: "https://github.com/zxffan/vue2-ssr",
  },
  {
    frame: "vue3-ssr",
    repo: "https://github.com/zxffan/vue3-ssr",
  },
];

export const templates = repos;
export const repoName = repos.map((r) => r.frame);
