import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import BaseWidget from 'js/widget/BaseWidget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';

import JenkinsBuildMetric from 'js/metric/JenkinsBuildMetric.jsx'
import CodeCoverageMetric from 'js/metric/CodeCoverageMetric.jsx';
import SonarViolationMetric from 'js/metric/SonarViolationMetric.jsx';
import BuildAuthorMetric from 'js/metric/BuildAuthorMetric.jsx';

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

          <JenkinsBuildMetric value={this.state.progress}/>

      );
    } else {
      /*
       <div className="last-update">
       <div>Jenkins : {this.state.jenkinsLastUpdate}</div>
       <div>Sonar : {this.state.sonarLastUpdate}</div>
       </div>
       */
      return (
        <div>
          <div className="metrics">
            <SonarViolationMetric
              value={this.state.violations}
              thresholds={this.props.thresholds.violations}
            />
            <BuildAuthorMetric
              avatars={this.props.avatars}
              jenkinsAuthor={this.state.buildAuthor}
            />
          </div>
        </div>
      );
    }
  }

  renderBeforeContent() {
    return (
      <div className="before-content last-update">
        <div>Jenkins : {this.state.jenkinsLastUpdate}</div>
        <div>Sonar : {this.state.sonarLastUpdate}</div>
      </div>
    );
  }

  renderFooter() {
    if (this.state.state == 'UNKNOWN' || this.state.state == 'REBUILDING') {
      return <div></div>;
    }
    return (
      <CodeCoverageMetric
        value={this.state.coverage}
        thresholds={this.props.thresholds.codeCoverage}/>
    );
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

