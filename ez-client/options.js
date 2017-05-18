const path = require('path');

var Options = {
  DEFAULT_API_PORT: "8081",
  DEFAULT_BUILD_DIR: path.resolve(__dirname, 'assets'),
  API_PORT_OPT: "--api-port",
  BUILD_DIR_OPT: "--build-dir"
};

Options.getOpt = function (optName, defaultValue) {
  const optIdx = process.argv.indexOf(optName);
  if (optIdx != -1) {
    return process.argv[optIdx + 1];
  }
  return defaultValue;
};

Options.getApiPort = function () {
  return Options.getOpt(Options.API_PORT_OPT, Options.DEFAULT_API_PORT);
};

Options.getBuildDir = function () {
  return Options.getOpt(Options.BUILD_DIR_OPT, Options.DEFAULT_BUILD_DIR);
};

module.exports = Options;
