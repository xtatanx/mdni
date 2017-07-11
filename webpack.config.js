const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const path = require('path');
const restSpreadPlugin = require('babel-plugin-transform-object-rest-spread');
const rupture = require('rupture');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

//  Silence webpack warning about soon to be deprecated API's
process.noDeprecation = true;

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(\/node_modules|\/bower_components)/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /(\/node_modules|\/bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [restSpreadPlugin],
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true,
                use: [
                rupture()
              ]
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './dist/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    stats: {
      maxModules: 0
    }
  }
};
