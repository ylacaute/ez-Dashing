import React from 'react';

import "./mosaic.scss"

const WIDTH_BREAKPOINT_CLASSES = [
      "width-lg",
      "width-md",
      "width-sm",
      "width-xs",
      "width-xxs",
      "width-xxxs"
];

const HEIGHT_BREAKPOINT_CLASSES = [
      "height-lg",
      "height-md",
      "height-sm",
      "height-xs",
      "height-xxs",
      "height-xxxs"
];

const WIDTH_BREAKPOINT = {
  LG: WIDTH_BREAKPOINT_CLASSES[0],
  MD: WIDTH_BREAKPOINT_CLASSES[1],
  SM: WIDTH_BREAKPOINT_CLASSES[2],
  XS: WIDTH_BREAKPOINT_CLASSES[3],
  XXS: WIDTH_BREAKPOINT_CLASSES[4],
  XXXS: WIDTH_BREAKPOINT_CLASSES[5],

  values: WIDTH_BREAKPOINT_CLASSES
};

const HEIGHT_BREAKPOINT = {
  LG: HEIGHT_BREAKPOINT_CLASSES[0],
  MD: HEIGHT_BREAKPOINT_CLASSES[1],
  SM: HEIGHT_BREAKPOINT_CLASSES[2],
  XS: HEIGHT_BREAKPOINT_CLASSES[3],
  XXS: HEIGHT_BREAKPOINT_CLASSES[4],
  XXXS: HEIGHT_BREAKPOINT_CLASSES[5],

  values: HEIGHT_BREAKPOINT_CLASSES
};

export {
  WIDTH_BREAKPOINT,
  HEIGHT_BREAKPOINT
}

const breakPoints = {
  width: {
    lg: 400,
    md: 200,
    sm: 100,
    xs: 50,
  },
  height: {
    lg: 400,
    md: 200,
    sm: 100,
    xs: 50,
  }
};