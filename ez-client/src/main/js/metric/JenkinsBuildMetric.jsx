import React from 'react';
import PropTypes from 'prop-types';

import CircularProgressBar from 'js/core/CircularProgressBar.jsx'

class JenkinsBuildMetric extends React.Component {

  render() {
    return (
      <CircularProgressBar
        className={`metric jenkins-build ${this.props.className}`}
        value={this.props.value}
        textForValue={(value) => `${value}%`}
      />
    );
  }
}

JenkinsBuildMetric.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired
};

export default JenkinsBuildMetric;
