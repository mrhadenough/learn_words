var path = require('path')
var webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
require('babel-polyfill')

const outputPath = path.resolve('./core/static/js/dist/');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './core/static/js/app/index',
    ],
  },
  output: {
    path: outputPath,
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:3000/core/static/js/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(), // don't reload if there is an error
    new BundleTracker({ filename: './webpack-stats.json' }),
    new webpack.DllReferencePlugin({
      name: 'vendor',
      context: './core/static/js',
      manifest: require(path.join(outputPath, 'vendor-manifest.json'))  // eslint-disable-line
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader/webpack', 'babel'],
      // watch for js changes
      include: path.join(__dirname, '/core/static/js/'),
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },
    ],
  },
  resolve: {
    root: [
      path.resolve('./core/static/js'),
    ],
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
  },
}
