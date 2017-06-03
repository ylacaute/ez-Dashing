import React from 'react';

class SvgArrow {}

SvgArrow.genConfig = function(xIcon, yIcon, wViewPort, hViewPort) {
  const hIcon = hViewPort / 100 * 30;//63
  const wIcon = wViewPort / 100 * 30;//70
  return {
    xIcon: xIcon,
    yIcon: yIcon,
    hIcon: hIcon,
    wIcon: wIcon,
    xHalf: wIcon / 2,
    ySide: yIcon + hViewPort / 100 * 15,
    strokeWidth: 2//wViewPort / 100 * 10
  }
};

SvgArrow.drawMain = function(cfg) {
  return (
    <line strokeLinecap="round" stroke="black" strokeWidth={cfg.strokeWidth}
          x1={cfg.xIcon + cfg.xHalf} y1={cfg.yIcon} x2={cfg.xIcon + cfg.xHalf} y2={cfg.yIcon + cfg.hIcon}/>
  )
};

SvgArrow.drawLeftHead = function(cfg) {
  return (
    <line strokeLinecap="round" stroke="black" strokeWidth={cfg.strokeWidth}
          x1={cfg.xIcon} y1={cfg.ySide} x2={cfg.xIcon + cfg.xHalf} y2={cfg.yIcon} />
  )
};

SvgArrow.drawRightHead = function(cfg) {
  return (
    <line strokeLinecap="round" stroke="black" strokeWidth={cfg.strokeWidth}
          x1={cfg.xIcon + cfg.xHalf} y1={cfg.yIcon} x2={cfg.xIcon + cfg.xHalf * 2} y2={cfg.ySide} />
  )
};


export default SvgArrow;
