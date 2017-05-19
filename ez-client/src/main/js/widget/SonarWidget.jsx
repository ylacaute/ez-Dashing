import React from 'react';
import SonarClient from 'js/client/SonarClient.jsx'

class SonarWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '',
      lines: '',
      coverage: '',
      violations: ''
    };
  }

  componentDidMount() {
    SonarClient.getSummaryInfos(this.props.projectKey, (jsonResponse) => {
      console.log("jsonResponse : ", jsonResponse);
      this.setState({
        lastUpdate: jsonResponse.lastUpdate,
        lines: jsonResponse.metrics.lines,
        coverage: jsonResponse.metrics.coverage,
        violations: jsonResponse.metrics.violations
      });
    });
  }

  render() {
    return (
      <section className="sonar-widget widget">
        <h1>{this.props.displayName}</h1>
        <div className="content">
          <p>Coverage<span className="metricValue">{this.state.coverage}</span></p>
          <p>Lines<span className="metricValue">{this.state.coverage}</span></p>
          <p>Violations<span className="metricValue">{this.state.violations}</span></p>
        </div>
        <footer className="last-update">
          <div>{this.state.lastUpdate}</div>
        </footer>
      </section>
    );
  }

}

SonarWidget.propTypes = {
  displayName: React.PropTypes.string.isRequired,
  projectKey: React.PropTypes.string.isRequired,
};



export default SonarWidget;

