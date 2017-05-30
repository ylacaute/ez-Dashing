import React from 'react';
import PropTypes from 'prop-types';

import CircularProgressBar from 'js/chart/CircularProgressBar.jsx'

class SonarViolationMetric extends React.Component {

  render() {
    return (
      <CircularProgressBar className="sonar-violations"
        value={100}
        displayValue={this.props.value}
        label="Violations"
        classForValue={(value, displayValue) => {
          if (displayValue > 5) return "bad";
          if (displayValue > 1) return "avg";
          return "good";
        }}/>
    );
  }
}

export default SonarViolationMetric;
