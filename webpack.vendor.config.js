/* eslint-disable semi, no-console */

const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
require('babel-polyfill');

const isProduction = process.env.NODE_ENV === 'production';
console.log(`Production mode - ${isProduction}`);

const outputPath = path.resolve('./core/static/js/dist/');

const config = {
  context: __dirname,

  entry: {
    vendor: [
      'babel-core/register',
      'babel-polyfill',
      'react',
      'react-dom',
      'history',
      'react-router',
      'redux',
      'react-redux',
      'react-bootstrap',
      'underscore',
    ],
  },

  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    library: '[name]',
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new BundleTracker({
      filename: (
        isProduction
        ? './core/static/js/dist/webpack-stats-vendor-prod.json'
        : './webpack-stats-vendor.json'
      ),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(outputPath, '[name]-manifest.json'),
      context: './core/static/js',
    }),
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'eslint-loader'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },

  resolve: {
    root: [
      path.resolve('./assets/src'),
    ],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
  },
  devtool: (isProduction ? 'eval' : 'source-map'),
};

if (isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ])
} else {
  config.output.publicPath = 'http://localhost:3000/core/static/js/dist/';
}

module.exports = config
