var path = require('path');
var webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const outputPath = path.resolve('./core/static/js/dist/');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './core/static/js/app/index',
    ],
  },
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new BundleTracker({
      filename: './core/static/js/dist/webpack-stats-prod.json',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }),
    new webpack.DllReferencePlugin({
      name: 'vendor',
      context: './core/static/js',
      manifest: require(path.join(outputPath, 'vendor-manifest.json'))  // eslint-disable-line
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '/core/static/js'),
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    root: [
      path.resolve('./core/static/js'),
    ],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js'],
    root: path.join(__dirname, 'node_modules'),
  },
};
