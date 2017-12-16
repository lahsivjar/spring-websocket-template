var path = require("path");

module.exports = {
  entry: "./src/main/webapp/js/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "/src/main/resources/dynamic_resources"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, "./src/main/webapp/js"),
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-2"]
        }
      }
    ]
  }
}

