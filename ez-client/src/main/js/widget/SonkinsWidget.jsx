import React from 'react';
import JenkinsClient from 'js/client/JenkinsClient.jsx'
import SonarClient from 'js/client/SonarClient.jsx'

class SonkinsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jenkinsLastUpdate: '',
      sonarLastUpdate: '',
      buildState: 'UNKNOWN',
      buildAuthor: '',
      lines: '',
      coverage: '',
      violations: ''
    };
  }

  componentDidMount() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      this.setState({
        buildState: jsonResponse.status,
        jenkinsLastUpdate: jsonResponse.lastUpdate,
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

  getClassName() {
    return "sonar-jenkins-widget widget " + this.state.buildState;
  }

  renderContent() {
    if (this.state.buildState == 'UNKNOWN') {
      return (
        <div className="content">
        </div>
      );
    }
    if (this.state.status == 'REBUILDING') {
      return (
        <div className="content">
          <span>REBUILDING</span>
        </div>
      );
    } else {
      return (
        <div className="content">
          <p>Coverage<span className="metricValue">{this.state.coverage}</span></p>
          <p>Lines<span className="metricValue">{this.state.lines}</span></p>
          <p>Violations<span className="metricValue">{this.state.violations}</span></p>
        </div>
      )
    }
  }

  render() {

    return (
      <section className={this.getClassName()} id="test">
        <h1>{this.props.displayName}</h1>
        <label>{this.props.branch}</label>
        {this.renderContent()}
        <footer className="last-update">
          <div>{this.state.buildAuthor}</div>
          <div>{this.state.jenkinsLastUpdate}</div>
        </footer>
      </section>
    );
  }

}

SonkinsWidget .propTypes = {
  displayName: React.PropTypes.string.isRequired,
  jobName: React.PropTypes.string.isRequired,
  branch: React.PropTypes.string.isRequired,
  projectKey: React.PropTypes.string.isRequired
};


export default SonkinsWidget;

