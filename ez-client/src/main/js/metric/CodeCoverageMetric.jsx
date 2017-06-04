import React from 'react';
import PropTypes from 'prop-types';

import LinearProgressBar from 'js/core/LinearProgressBar.jsx';
import ThresholdConfig from 'js/config/ThresholdConfig.jsx';

class CodeCoverageMetric extends React.Component {

  render() {
    return (
      <LinearProgressBar
        className="metric code-coverage"
        value={parseInt(this.props.value)}
        label="Code Coverage"
        textForValue={(value) => `${value} %`}
        classForValue={(val) => ThresholdConfig.get(this.props.thresholds, val)}
      />
    );
  }
}

CodeCoverageMetric.propTypes = {
  value: PropTypes.number.isRequired,
  thresholds: PropTypes.object
};

export default CodeCoverageMetric;
