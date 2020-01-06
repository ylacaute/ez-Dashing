const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const IS_DEV = (process.env.NODE_ENV === 'development');
const BUILD_DIR = path.join(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src/main');
const JS_DIR = SRC_DIR + "/js";
const STYLE_DIR = SRC_DIR + "/js/style";
const RESOURCES_DIR = SRC_DIR + "/resources";
const TEMPLATE_DIR = SRC_DIR + "/template";
const LIB_DIR = 'node_modules';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Common Webpack configuration for production or development
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let commonConfig = {

  // Context directory for sources (entries are defined with relative path from there)
  context: SRC_DIR,

  // Source entries to compile
  entry: {
    app: [
      //'react-hot-loader/patch', // require.resolve('webpack/hot/dev-server'),
      './js/main.jsx'
    ].filter(Boolean),
    defaultTheme: STYLE_DIR + "/theme/default.scss",
    blackTheme: STYLE_DIR + "/theme/black.scss",
    darkBlueTheme: STYLE_DIR + "/theme/dark-blue.scss",
    dashingTheme: STYLE_DIR + "/theme/dashing.scss",
    neonTheme: STYLE_DIR + "/theme/neon.scss",
    snowTheme: STYLE_DIR + "/theme/snow.scss"
  },

  // Directories where to search to resolve imports
  resolve: {
    modules: [
      LIB_DIR,
      JS_DIR,
      STYLE_DIR,
      RESOURCES_DIR
    ],
    extensions: ['.js', '.jsx']
  },

  output: {
    filename: '[name].[hash].js',
  },

  optimization: {
    namedChunks: true
  },

  // Plugins extensions
  plugins: [

    // Add extra globals as __webpack_hash__ to get the hash inside code
    new webpack.ExtendedAPIPlugin(),

    // Inject constants at compile time to template some piece of code
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV,
    }),

    //new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: 'css/[name].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),

    // Copy resources directory to the output
    new CopyWebpackPlugin([{
      from: RESOURCES_DIR, to: BUILD_DIR
    }]),

    // Generate the index.html from a template
    new HtmlWebpackPlugin({
      hash: true,
      title: 'ez-Dashing',
      filename: 'index.html',
      template: TEMPLATE_DIR + '/index.ejs',
      inject: 'body',
      // Don't inject css into the html template in order to manage them dynamically
      excludeChunks: [ "blackTheme", "darkBlueTheme", "dashingTheme", "defaultTheme", "neonTheme", "snowTheme" ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              // hmr: process.env.NODE_ENV === 'development',
            }
          },
          {
            loader: 'css-loader',
            options: { url: false }
          }, {
            loader: 'sass-loader'
          }
        ],
      }, {
        test: /\.(png|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader?name=img/[name].[ext]',
          options: {
            // No file emitted because CopyWebpackPlugin already copy those files
            emitFile: false
          }
        }]
      }, {
        test: /\.mdx?$/,
        use: [
          'babel-loader',
          '@mdx-js/loader'
        ]
      }
    ]
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DEV CONFIG
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let devConfig = {

  mode: 'development',

  // generated code only (no source-map for faster build)
  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
    path: BUILD_DIR,
    chunkFilename: '[name].chunk.js'
  },

  devServer: {
    contentBase: path.resolve('resources'),
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://localhost:8080"
      }
    },
    open: true,
    //hot: true
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  }

};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PROD CONFIG
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let prodConfig = {

  mode: 'production',

  // generated code and source-map (slower build)
  devtool: 'cheap-module-source-map',

  output: {
    filename: '[name].[hash].js',
    path: BUILD_DIR
  },

  // add some plugins for production build
  plugins: commonConfig.plugins.concat([

    // Force to remove the build directory before each production build
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [BUILD_DIR]
    })
  ])
};

if (IS_DEV) {
  module.exports = Object.assign(commonConfig, devConfig);
} else {
  module.exports = Object.assign(commonConfig, prodConfig);
}
