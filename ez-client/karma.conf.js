
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src/main/js');
const LIB_DIR = 'node_modules';


module.exports = function(config) {
  config.set({
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      {
        pattern: 'src/test/**/*Test.js',
        watched: false
      }
    ],

    frameworks: ['mocha'],

    preprocessors: {
      'src/test/**/*Test.js': ['webpack']
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'build/coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'text-summary' }
      ]
    },

    webpack: {
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: ["es2015", "react"],
                plugins: [
                  "transform-class-properties",
                  "transform-object-rest-spread"
                ]
              },
            }],
          },{
            test: /\.js/,
            exclude: /(test|node_modules|bower_components)/,
            loader: 'istanbul-instrumenter-loader'
          }
        ]
      },

      resolve: {
        modules: [
          SRC_DIR,
          LIB_DIR
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    plugins: [
      require("karma-webpack"),
      require("istanbul-instrumenter-loader"),
      require("karma-mocha"),
      require("karma-coverage"),
      require("karma-phantomjs-launcher"),
      require("karma-spec-reporter")
    ],

    browsers: ['PhantomJS']

  });
};
