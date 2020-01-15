const path = require('path');

module.exports = {
  resolve: {
    modules: [
      "node_modules",
      "src/main/js",
      "src/main/resources"
    ],
    alias: {
      Doc: path.resolve(__dirname, 'component/'),
    }
  },
  plugins: [],
  module: {
    rules: [
    {
      test: /\.(css|sass|scss)$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"],
      include: path.resolve(__dirname, '../'),
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    }],
  },
};
