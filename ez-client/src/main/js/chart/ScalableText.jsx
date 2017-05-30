import React from 'react';
import PropTypes from 'prop-types';

class ScalableText extends React.Component {

  render() {
    return (
      <div className={`scalable-text ${this.props.className}`}>
        <svg width="100%" height="100%" viewBox="0 0 10 10">
          <text className="text" x={5} y={5}>
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
