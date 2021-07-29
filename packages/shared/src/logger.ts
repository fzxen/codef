import colors from "colors";

export const logger = {
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
