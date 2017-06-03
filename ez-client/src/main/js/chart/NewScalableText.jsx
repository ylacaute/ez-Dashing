import React from 'react';
import PropTypes from 'prop-types';

import SvgArrow from 'js/chart/SvgArrow.jsx';

class NewScalableText extends React.Component {
//
  /*
   {SvgArrow.drawMain(cfg)}
   {SvgArrow.drawLeftHead(cfg)}
   {SvgArrow.drawRightHead(cfg)}
   */
  render() {
    const style = {
      width: "100%"
    };
    const wViewPort = 100;
    const hViewPort = 100;
    const cfg = SvgArrow.genConfig(10, 10, wViewPort, hViewPort);
    return (
      <div className={`new-scalable-text ${this.props.className}`} style={style}>
        <svg width="100%" height="100%" preserveAspectRatio="xMinYMin meet"
             viewBox={`0 0 ${wViewPort} ${hViewPort}`}
             >
          <text className="text" x={0} y={hViewPort / 2} fontSize="45" fill="#FFF" textAnchor="start"
                dominantBaseline="middle">
            {this.props.text}
          </text>
        </svg>
      </div>
    );
  }
}

NewScalableText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  fixedWidth: PropTypes.number
};

NewScalableText.defaultProps = {
  className: '',
};

export default NewScalableText;
