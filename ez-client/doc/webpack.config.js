module.exports = {
  resolve: {
    modules: [
      "node_modules",
      "src/main/js",
      "src/main/sass",
      "src/main/resources",
      "doc"
    ]
  },
  plugins: [],
  module: {
    rules: [
    {
      test: /\.(css|sass|scss)$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
    {
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    }],
  },
};
