import colors from "colors";

export default {
  notice(msg: string) {
    console.log(colors.green(msg));
  },
  error(msg: string) {
    console.log(colors.red(msg));
  },
  plain(msg: string) {
    console.log(msg);
  },
};
