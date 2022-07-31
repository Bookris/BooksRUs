const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: '[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: [/node_modules/, /archive/],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/, /archive/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ['file-loader'],
      },
    ]

  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/build',
    },
    proxy: { '/**': 'http://localhost:3000' },
    compress: true,
    hot: true,
    port: 8080
  },

}