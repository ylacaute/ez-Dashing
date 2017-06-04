import React from 'react';
import PropTypes from 'prop-types';

import CircularProgressBar from 'js/core/CircularProgressBar.jsx'

class JenkinsBuildMetric extends React.Component {

  render() {
    return (
      <CircularProgressBar
        className="jenkins-build"
        value={this.props.value}
        textForValue={(value) => `${value}%`}/>
    );
  }
}

JenkinsBuildMetric.propTypes = {
  value: PropTypes.number.isRequired
};

export default JenkinsBuildMetric;
