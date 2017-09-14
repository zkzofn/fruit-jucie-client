const webpack = require('webpack');

let apiHost;

const setupAPI = () => {
  switch(process.env.NODE_ENV) {
    case "production":
      return apiHost = "13.124.237.236:3000";
      break;
    case "develop":
    default:
      apiHost = "http://localhost:3000";
      break;
  }
};

setupAPI();

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  pulgins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      __API__: apiHost
    })
  ],
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
        target: apiHost,
        secure: false,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};