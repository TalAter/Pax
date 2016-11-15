var path = require("path");

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "ptt.js"
  }
};
