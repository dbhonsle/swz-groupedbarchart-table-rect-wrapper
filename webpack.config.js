const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src/lib'),
  entry: {
    D3ChartwithTableWrapper: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { 
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread",
              "transform-decorators-legacy"
            ],
            presets: [
              ['es2015', { 'modules': false }],
              "es2016",
              "react"
            ]
          },
        }],
      },
	    
      // Loaders for other file types can go here
	{
        test: /\.(sass|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      } 
    ],
  }
};