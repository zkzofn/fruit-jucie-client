'use strict';

var webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  pulgins: [new webpack.optimize.DedupePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }), new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  })],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};

//# sourceMappingURL=webpack.config-compiled.js.map