import React from 'react';
import PropTypes from 'prop-types';

class ScalableText extends React.Component {

  render() {
    const xWidth = 1 + this.props.text.length * 6;
    const xHeight = 10;
    const xText = xWidth / 2;
    const yText = xHeight / 2;
    return (
      <div className={`scalable-text ${this.props.className}`}>
        <svg width="100%" height="100%" viewBox={`0 0 ${xWidth} ${xHeight}`}>
          <text className="text" x={xText} y={yText}>
            {this.props.text}
          </text>
        </svg>
      </div>
    );
  }
}

ScalableText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

ScalableText.defaultProps = {
  className: '',
};

export default ScalableText;
