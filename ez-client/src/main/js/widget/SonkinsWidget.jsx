import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import JenkinsBuildMetric from 'js/fragment/JenkinsBuildMetric.jsx'
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';
import CodeCoverageMetric from 'js/fragment/CodeCoverageMetric.jsx';
import SonarViolationMetric from 'js/fragment/SonarViolationMetric.jsx';

class SonkinsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jenkinsLastUpdate: '',
      sonarLastUpdate: '',
      state: 'UNKNOWN',
      progress: 0,
      buildAuthor: '',
      lines: 0,
      coverage: 0,
      violations: 0
    };
  }

  componentDidMount() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      this.setState({
        jenkinsLastUpdate: jsonResponse.lastUpdate,
        state: jsonResponse.state,
        progress : jsonResponse.progress,
        author: jsonResponse.author
      });
    });
    SonarClient.getSummaryInfos(this.props.projectKey, (jsonResponse) => {
      this.setState({
        sonarLastUpdate: jsonResponse.lastUpdate,
        lines: jsonResponse.metrics.lines,
        coverage: jsonResponse.metrics.coverage,
        violations: jsonResponse.metrics.violations
      });
    });
  }

  renderContent() {
    if (this.state.state == 'UNKNOWN') {
      return (
        <div>
        </div>
      );
    }
    if (this.state.state == 'REBUILDING') {
      return (
        <JenkinsBuildMetric value={this.state.progress}/>
      );
    } else {
       return (
         <SonarViolationMetric value={2}/>
      )
    }
  }

  render() {
    return (
      <Widget
        className={`sonkins ${this.state.state}`}
        title={this.props.displayName}
        subTitle={`${this.props.branch} - ${this.state.jenkinsLastUpdate}`}
        content={
          this.renderContent()
        }
        footer={
          <CodeCoverageMetric value={this.state.coverage}/>
        }
      />
    );
  }
}

SonkinsWidget.propTypes = {
  displayName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired
};

export default SonkinsWidget;

