var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './learnwords/static/js/app/index'
  ],
  output: {
    // physical path to compiled js
    path: path.join(__dirname, './learnwords/static/js/dist/'),
    // name of the compiled file <script src="{% static 'js/dist/bundle.js' %}"></script>
    filename: 'bundle.js',
    // js client will look for hot reload patch json here {% static '/static/..' %}
    publicPath: './static/js/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      cheap: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      // watch for js changes
      include: path.join(__dirname, '/learnwords/static/js/app')
    }]
  }
};
