const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main_bundle.js'
  },
  resolve: {
    alias: {
      js$: path.resolve(__dirname, './main.js'),
      html$: path.resolve(__dirname,'./src/index.html'), 
    }
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
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlWebpackPlugin]
};