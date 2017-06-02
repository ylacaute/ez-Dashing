import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import BaseWidget from 'js/widget/BaseWidget.jsx';

import JenkinsBuildMetric from 'js/fragment/JenkinsBuildMetric.jsx'
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';
import CodeCoverageMetric from 'js/fragment/CodeCoverageMetric.jsx';
import SonarViolationMetric from 'js/fragment/SonarViolationMetric.jsx';
import BuildAuthor from 'js/fragment/BuildAuthor.jsx';

class SonkinsWidget extends BaseWidget {

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

  refreshData() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      this.setState({
        jenkinsLastUpdate: jsonResponse.lastUpdate,
        state: jsonResponse.state,
        progress: jsonResponse.progress,
        buildAuthor: jsonResponse.author
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
      return this.renderLoadingContent();
    }
    if (this.state.state == 'REBUILDING') {
      return (
        <div className="single">
          <JenkinsBuildMetric value={this.state.progress}/>
        </div>
      );
    } else {
      return (
        <div>
          <div className="last-update">
            <div>Jenkins : {this.state.jenkinsLastUpdate}</div>
            <div>Sonar : {this.state.sonarLastUpdate}</div>
          </div>
          <div className="metrics">
            <BuildAuthor avatars={this.props.avatars} jenkinsAuthor={this.state.buildAuthor}/>
            <SonarViolationMetric value={this.state.violations}/>
          </div>
        </div>
      );
    }
  }

  renderFooter() {
    if (this.state.state == 'UNKNOWN') {
      return <div></div>;
    }
    return <CodeCoverageMetric value={this.state.coverage}/>;
  }

  render() {
    return (
      <Widget
        className={`sonkins ${this.state.state}`}
        title={this.props.displayName}
        subTitle={this.props.branch}
        content={this.renderContent()}
        footer={this.renderFooter()}
      />
    );
  }
}

SonkinsWidget.propTypes = {
  displayName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired,
  refreshEvery: PropTypes.number
};

SonkinsWidget.defaultProps = {
  refreshEvery: 60,
};

export default SonkinsWidget;

