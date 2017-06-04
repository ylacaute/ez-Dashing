import React from 'react';
import PropTypes from 'prop-types';

import ScalableImage from 'js/core/ScalableImage.jsx'
import SimpleMetric from 'js/metric/SimpleMetric.jsx';


class SimpleMetricWithIcon extends React.Component {

  render() {
    return (
      <div className="metric lines">
        <div className="icon">
          <ScalableImage url="/img/icon/arrow-up-green.png" />
        </div>
        <div className="texts">
          <SimpleMetric label="Violations"
                        value={0}
                        fixedLabelWidth={45}
                        fixedValueWidth={22}
                        classForValue={(val) => {
                          if (val > 5) return "bad";
                          if (val > 1) return "avg";
                          return "good";
                        }}/>
        </div>
      </div>
    );
  }
}

SimpleMetricWithIcon.propTypes = {
  className: PropTypes.string,
  textForValue: PropTypes.func,
  classForValue: PropTypes.func
};

SimpleMetricWithIcon.defaultProps = {
  className: '',
  textForValue: (value) => `${value}`,
  classForValue: (value) => ''
};

export default SimpleMetricWithIcon;
