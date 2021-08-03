import { definePlugin } from "codef";

const customPlugin = definePlugin(({ registerCommand }) => {
  registerCommand({
    command: "custom",
    description: "custom command",
    action() {
      console.log("custome");
    },
  });
});
export default {
  plugins: [customPlugin.install()],
  version: "4.7.1",
};
