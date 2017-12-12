var path = require("path");

module.exports = {
  entry: "./src/main/webapp/js/index.js",
  devtool: "sourcemaps",
  output: {
    path: __dirname,
    filename: "./src/main/resources/dynamic_resources/bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, "./src/main/webapp/js"),
        loader: "babel-loader",
        query: {
          presets: ["env", "react"]
        }
      }
    ]
  }
}

