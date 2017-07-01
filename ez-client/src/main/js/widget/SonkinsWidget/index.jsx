import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';

import ThresholdConfig from 'js/config/ThresholdConfig.jsx';

import JenkinsBuildMetric from 'js/metric/JenkinsBuildMetric.jsx'
import CodeCoverageMetric from 'js/metric/CodeCoverageMetric.jsx';
import SimpleMetricWithIcon from 'js/metric/base/SimpleMetricWithIcon.jsx';
import BuildAuthorMetric from 'js/metric/BuildAuthorMetric.jsx';

import ScalableText from 'js/core/ScalableText.jsx';
import SimpleMetric from 'js/metric/base/SimpleMetric.jsx';


const NO_DATE = '--/-- --:--';

class SonkinsWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      jenkinsLoaded: false,
      sonarLoaded: false,
      exception: null,
      jenkinsLastUpdate: NO_DATE,
      sonarLastUpdate: NO_DATE,
      state: 'UNKNOWN',
      progress: 0,
      buildAuthor: '--',
      lines: 0,
      coverage: 0,
      violations: 0
    };
  }

  refreshData() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      this.setState({
        jenkinsLoaded: true,
        jenkinsLastUpdate: jsonResponse.lastUpdate,
        state: jsonResponse.state,
        progress: jsonResponse.progress,
        buildAuthor: jsonResponse.author
      });
    }, (exception) => {
      console.log("Error during Jenkins request, details: ", exception);
      this.setState({exception: exception});
    });

    SonarClient.getSummaryInfos(this.props.projectKey, (jsonResponse) => {
      this.setState({
        sonarLoaded: true,
        sonarLastUpdate: jsonResponse.lastUpdate,
        lines: jsonResponse.metrics.lines,
        coverage: jsonResponse.metrics.coverage,
        violations: jsonResponse.metrics.violations
      });
    }, (exception) => {
      console.log("Error during Sonar request, details: ", exception);
      this.setState({exception: exception});
    });
  }

  renderAfterTitle() {
    const jenkinsLastUpdate = this.state.jenkinsLastUpdate != null ? this.state.jenkinsLastUpdate : NO_DATE;
    const sonarLastUpdate = this.state.sonarLastUpdate != null ? this.state.sonarLastUpdate : NO_DATE;
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
            text={jenkinsLastUpdate}
            textAnchor="middle"
          />
          <ScalableText
            iconUrl="/img/tech/sonar.png"
            text={sonarLastUpdate}
            textAnchor="middle"
          />
        </div>
      </div>
    );
  }

  renderContentBuilding() {
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
  }

  renderContent() {
    if (this.state.exception != null) {
      return this.renderError(this.state.exception);
    }
    if (this.state.sonarLoaded == false || this.state.jenkinsLoaded == false) {
      return this.renderLoadingContent();
    }
    if (this.state.state == 'REBUILDING') {
      return this.renderContentBuilding();
    }
    /*
     <BuildAuthorMetric
     avatars={this.props.avatars}
     jenkinsAuthor={this.state.buildAuthor}
     />
     */
    return (
      <div>
        <div className="metrics">
          <div className="iconMetric">
            <div>
              <p>IMG</p>
            </div>
            <div>
              <p>TXT</p>
            </div>
          </div>
          <div>
            <SimpleMetric
              className="metric violations"
              label="Violations"
              value={this.state.violations}
              fixedValueWidth={30}
              fixedLabelWidth={60}
              classForValue={(val) => ThresholdConfig.get(this.props.thresholds.violations, val)}
            />
            <SimpleMetric
              className="metric coverage"
              label="Coverage"
              value="56"
              fixedValueWidth={30}
              fixedLabelWidth={60}
              textForValue={(val) => `${val} %`}
              classForValue={(val) => ThresholdConfig.get(this.props.thresholds.codeCoverage, val)}
            />
          </div>
        </div>
      </div>
      );
  }

  renderFooter() {
    const s = this.state;
    if (s.exception != null || s.sonarLoaded == false || s.state == 'UNKNOWN' || s.state == 'REBUILDING') {
      return <div></div>;
    }
    return <div></div>;
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
  refreshEvery: PropTypes.number,
  displayName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  projectKey: PropTypes.string.isRequired,
  avatars: PropTypes.array,
  thresholds: PropTypes.object
};

SonkinsWidget.defaultProps = {
  refreshEvery: 120,
  jobName: 'undefined',
  branch: 'undefined',
  projectKey: 'undefined',
  avatars: [],
  thresholds: {
    violations: {},
    codeCoverage: {},
  }
};

export default SonkinsWidget;

