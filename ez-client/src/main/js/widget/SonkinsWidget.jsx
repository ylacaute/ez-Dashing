import React from 'react';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import SonarClient from 'js/client/SonarClient.jsx';
import LabelWithValue from 'js/fragment/LabelWithValue.jsx';
import CircularProgressBar from 'js/chart/CircularProgressBar.jsx'
import LinearMetricBar from 'js/chart/LinearMetricBar.jsx';

//import ReactMDL from 'ReactMDL';
//import ProgressBar from 'react-mdl/lib/ProgressBar';
//import Progress from 'react-progress';

class SonkinsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jenkinsLastUpdate: '',
      sonarLastUpdate: '',
      state: 'UNKNOWN',
      progress: '',
      buildAuthor: '',
      lines: '',
      coverage: '',
      violations: ''
    };
  }

  componentDidMount() {
    JenkinsClient.getBuildInfo(this.props.jobName, this.props.branch, (jsonResponse) => {
      this.setState({
        state: jsonResponse.state,
        progress : jsonResponse.progress,
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

  getClassNames() {
    return "sonkins-widget widget " + this.state.state;
  }

  renderContent() {
    if (this.state.state == 'UNKNOWN') {
      return (
        <div className="content">
        </div>
      );
    }
    if (this.state.state == 'REBUILDING') {
      return (
        <div className="content">
          <CircularProgressBar percentage={this.state.progress}/>
        </div>
      );
    } else {
      return (
        <div className="content">
          <LabelWithValue label="Lines" value={this.state.lines}/>
          <LabelWithValue label="Violations" value={this.state.violations}/>
        </div>
      )
    }
  }

  render() {
    return (
      <section className={this.getClassNames()} id="test">
        <header>
          <h1>{this.props.displayName}</h1>
          <label>{this.props.branch} - {this.state.jenkinsLastUpdate}</label>
        </header>
        {this.renderContent()}
        <footer>
          <div className="author">{this.state.author}</div>

        </footer>
        <LinearMetricBar styleName="code-coverage"
                         label="Code coverage"
                         percentage={this.state.coverage}
                         classForPercentage={(percentage) => {
                           if (percentage < 60) return "bad";
                           if (percentage < 70) return "average";
                           return "good";
                         }}/>
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

