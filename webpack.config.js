const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './client/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
    // static: {
    //   directory: path.resolve(__dirname, 'dist'),
    //   publicPath: '/',
    // },
    historyApiFallback: true,
    proxy: { 
      '/books': 'http://localhost:3000',
      '/test': 'http://localhost:3000',
      '/authorized': 'http://localhost:3000',
      '/oauth': 'http://localhost:3000'
     },
    // proxy: { '/test/': 'http://localhost:3000' }, 
    // proxy: { '/authorized/': 'http://localhost:3000' }, 
    // proxy: { '/oauth/': 'http://localhost:3000' }, 
    compress: true,
    hot: true,
    port: 8080
  },

}