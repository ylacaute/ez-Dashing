import React from 'react';
import CircularProgressBar from 'js/chart/CircularProgressBar.jsx'

class JenkinsBuildMetric extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CircularProgressBar
        className="jenkins-build"
        value={this.props.value}
        textForValue={(value) => `${value}%`}/>
    );
  }
}

export default JenkinsBuildMetric;
