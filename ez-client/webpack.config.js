const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const IS_DEV = (process.env.NODE_ENV === 'dev');
const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src/main');
const JS_DIR = SRC_DIR + "/js";
const SASS_DIR = SRC_DIR + "/sass";
const RESOURCES_DIR = SRC_DIR + "/resources";
const TEMPLATE_DIR = SRC_DIR + "/template";
const LIB_DIR = 'node_modules';

// Common Webpack configuration for production or development
let commonConfig = {

  // Context directory for sources (entries are defined with relative path from there)
  context: SRC_DIR,

  // Source entries to compile
  entry: {
    app: [
      'react-hot-loader/patch',
      './js/main.jsx'
    ],
    vendor: ["eases", "jsonpath", "moment", "react", "react-animated-number", "react-dom", "react-grid-layout",  "victory"]
  },

  // Directories where to search to resolve imports
  resolve: {
    modules: [
      LIB_DIR,
      JS_DIR,
      SASS_DIR
    ]
  },

  // Plugins extensions
  plugins: [

    // Add extra globals as __webpack_hash__ to get the hash inside code
    new webpack.ExtendedAPIPlugin(),

    // Inject constants at compile time to template some piece of code
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),

    // Extract css in a file
    new ExtractTextPlugin({
      filename: "css/style.css",
      allChunks: true
    }),

    // Copy resources directory to the output
    new CopyWebpackPlugin([{
      from: RESOURCES_DIR
    }]),

    // Extract vendor libs to have a clear separation with the application
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: '[name].js',
      minChunks: 2,
    }),

    // Generate the index.html from a template
    new HtmlWebpackPlugin({
      hash: true,
      title: 'RR-Boilerplate',
      filename: 'index.html',
      template: TEMPLATE_DIR + '/index.ejs',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "react"],
            plugins: [
              "react-hot-loader/babel",      // react hot reload
              "transform-class-properties",  // static
              "transform-object-rest-spread" // use of '...' for properties
            ]
          },
        }]
      },
      {
        test: /\.(css|sass|scss)$/,
        //exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },

  // https://github.com/webpack-contrib/css-loader/issues/447
  node: {
    fs: 'empty'
  }
};

let devConfig = {

  // generated code only (no source-map for faster build)
  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
    path: BUILD_DIR
  },

  devServer: {
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      }
    }
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }

};

let prodConfig = {

  // generated code and source-map (slower build)
  devtool: 'cheap-module-source-map',

  output: {
    filename: '[name].[chunkhash].js',
    path: BUILD_DIR
  },

  // add some plugins for production build
  plugins: commonConfig.plugins.concat([

    // Force to remove the build directory before each production build
    new CleanWebpackPlugin([BUILD_DIR])
  ])
};

if (IS_DEV) {
  module.exports = Object.assign(commonConfig, devConfig);
} else {
  module.exports = Object.assign(commonConfig, prodConfig);
}
