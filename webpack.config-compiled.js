'use strict';

var webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins1: [new webpack.optimize.DedupePlugin({
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
        cacheDirectory: true,
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file?name=public/fonts/[name].[ext]'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "file-loader?name=/public/icons/[name].[ext]"
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8080
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     secure: false,
    //     pathRewrite: { "^/api": "" }
    //   }
    // }
  }
};

//# sourceMappingURL=webpack.config-compiled.js.map