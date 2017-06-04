import React from 'react';
import PropTypes from 'prop-types';

import ScalableText from 'js/core/ScalableText.jsx'

class LinesCountMetric extends React.Component {

  render() {
    var iconRotation = 45;
    if (this.props.variation == "stable") {
      iconRotation = 90;
    } else if (this.props.variation == "less") {
      iconRotation = 135;
    }
    return (
      <div className="metric lines">
        <ScalableText
          iconUrl="/img/icon/arrow-up-green.png"
          iconRotation={iconRotation}
          text={`${this.props.lines}K Lines`}
          wViewPort={100}
        />
      </div>
    );
  }
}

LinesCountMetric.propTypes = {
  className: PropTypes.string,
  textForValue: PropTypes.func,
  classForValue: PropTypes.func,
  variation: PropTypes.string
};

LinesCountMetric.defaultProps = {
  className: '',
  textForValue: (value) => `${value}`,
  classForValue: (value) => '',
  variation: "more"

};

export default LinesCountMetric;
