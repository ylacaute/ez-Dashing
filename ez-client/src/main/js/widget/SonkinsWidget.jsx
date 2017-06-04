import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';

import JenkinsBuildMetric from 'js/metric/JenkinsBuildMetric.jsx'
import CodeCoverageMetric from 'js/metric/CodeCoverageMetric.jsx';
import SonarViolationMetric from 'js/metric/SonarViolationMetric.jsx';
import BuildAuthorMetric from 'js/metric/BuildAuthorMetric.jsx';

import ScalableText from 'js/core/ScalableText.jsx';


class SonkinsWidget extends RefreshableWidget {

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

  renderAfterTitle() {
    return (
      <div className="afterTitle">
        <ScalableText
          className="branch"
          text={this.props.branch}
          textAnchor="middle"
        />
        <div className="last-update">
          <ScalableText
            iconUrl="/img/tech/jenkins.png"
            text={this.state.jenkinsLastUpdate}
            textAnchor="middle"
          />
          <ScalableText
            iconUrl="/img/tech/sonar.png"
            text={this.state.sonarLastUpdate}
            textAnchor="middle"
          />
        </div>
      </div>
    );
  }

  renderContent() {
    if (this.state.state == 'UNKNOWN') {
      return this.renderLoadingContent();
    }
    if (this.state.state == 'REBUILDING') {
      return (
        <div className="flip-container">
          <div className="flip">
            <div className="front face">
              <JenkinsBuildMetric value={this.state.progress} />
            </div>
            <div className="back face">
              <BuildAuthorMetric
                avatars={this.props.avatars}
                jenkinsAuthor={this.state.buildAuthor}
              />
            </div>
          </div>
        </div>
      );
    } else {
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

  renderFooter() {
    if (this.state.state == 'UNKNOWN' || this.state.state == 'REBUILDING') {
      return <div></div>;
    }
    return (
      <CodeCoverageMetric
        value={this.state.coverage}
        thresholds={this.props.thresholds.codeCoverage}
      />
    );
  }

  render() {
    return (
      <Widget
        className={`sonkins ${this.state.state}`}
        title={this.props.displayName}
        afterTitle={this.renderAfterTitle()}
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

