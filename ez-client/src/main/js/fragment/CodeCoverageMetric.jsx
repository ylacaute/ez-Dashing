import React from 'react';
import PropTypes from 'prop-types';

import LinearProgressBar from 'js/chart/LinearProgressBar.jsx'

class CodeCoverageMetric extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearProgressBar
        className="code-coverage"
        value={parseInt(this.props.value)}
        label="Code Coverage"
        textForValue={(value) => `${value} %`}
        classForValue={(val) => {
          if (val > 65) return "good";
          if (val > 55) return "avg";
          return "bad";
        }}/>
    );
  }
}

export default CodeCoverageMetric;
