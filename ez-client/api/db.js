import path from 'path';
import fs from 'fs';

const mockDirectory = path.resolve(__dirname, 'mocks');

let createDB = () => {
  const files = fs.readdirSync(mockDirectory);
  let mocks = {};

  files.forEach((file) => {
    if (file.indexOf('.json') > -1) {
      Object.assign(mocks, require(mockDirectory + "/" + file));
    }
  });
  return mocks;
};

module.exports = function() {
  return createDB();
};



