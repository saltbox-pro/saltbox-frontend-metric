const { merge } = require("webpack-merge");
const path = require("path");
const dotEnv = require("dotenv");

dotEnv.config();

const commonPath = process.env.COMMON_REPO_PATH || "";

module.exports = (webpackConfigEnv, argv) => {
  const config = require("./webpack.config.js")(webpackConfigEnv, argv);

  return merge(config, {
    resolve: {
      alias: {
        ...(commonPath && {
          "@saltbox/saltbox-frontend-common": path.resolve(__dirname, commonPath),
        }),
      },
    },
  });
};
