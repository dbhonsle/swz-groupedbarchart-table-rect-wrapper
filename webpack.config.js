const path = require('path');
const webpack = require('webpack');
const noReactSuffix = '.no.react';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');

function getConfig(isReactExternalized) {
  config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    D3ChartwithTableWrapper: './wrappers/D3ChartwithTableWrapperHtml.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `[name]${isReactExternalized ? noReactSuffix : ''}.js`
  },
  resolve: {
            modules: ['src', 'node_modules'],
            alias: {
                'examples':  path.join(__dirname, './examples/src')
            }
        },
  resolveLoader: {
            modules: [path.resolve('src'), path.resolve('node_modules')]
        },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }],
      },
	    
      // Loaders for other file types can go here
	    {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', 
          'sass-loader',
        ]
      } 
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new OptimizeCssAssetsPlugin({
                parser: safeParser,
                cssProcessorOptions: {
                    discardComments: { removeAll: true }
                }
            })
    ]
  };

  if (isReactExternalized) {
        config.externals = {
            react: 'React',
            'react-dom': 'ReactDOM'
        };
    }
  return config;
};

module.exports = [getConfig(false), getConfig(true)];
