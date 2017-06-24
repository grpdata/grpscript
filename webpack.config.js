const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ts: {
    entry: {
      viewer: path.join(__dirname, './src/ts/main.ts'),
    },
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader'
        }]
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  },
  sass: {
    entry: {
      viewer: path.join(__dirname, './src/sass/main.scss'),
    },
    output: {
      filename: '[name].css'
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader?outputStyle=compressed"]
        })
      }]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
}
