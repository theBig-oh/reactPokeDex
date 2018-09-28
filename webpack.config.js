const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    
    filename: 'main.js'
  },
  module: {
    rules: [
  {
    test: /\.woff(2)?(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
},    
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
/*      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader!css-loader!sass-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }*/
            {
        test: /\.(scss|css)$/,
        loader:"style-loader!css-loader!sass-loader"
      },
    ]
  },
  plugins: [htmlWebpackPlugin]
};