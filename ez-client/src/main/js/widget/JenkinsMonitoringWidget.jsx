import React from 'react';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import LinearMetricBar from 'js/chart/LinearMetricBar.jsx';
import LabelWithValue from 'js/fragment/LabelWithValue.jsx';

class JenkinsMonitoringWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '',
      version: '',
      memory: 0,
      cpu: '',
      threadCount: '',
      activeThreadCount: '',
      freeDiskSpaceInTemp: ''
    };
  }

  componentDidMount() {
    JenkinsClient.getJenkinsInfo((jsonResponse) => {
      console.log("jsonResponse : ", jsonResponse);
      this.setState({
        lastUpdate: jsonResponse.lastUpdate,
        version: jsonResponse.version,
        memory: jsonResponse.memory,
        cpu: jsonResponse.cpu,
        fileDescriptor: jsonResponse.fileDescriptor,
        activeThreadCount: jsonResponse.activeThreadCount,
        threadCount: jsonResponse.threadCount,
        freeDiskSpaceInTemp: jsonResponse.freeDiskSpaceInTemp
      });
    });
  }

  render() {
    return (
      <section className="jenkins-info-widget widget">
        <header>
          <h1>{this.props.displayName}</h1>
          <label>{this.state.version}</label>
        </header>
        <div className="content">
          <LabelWithValue label="Active thread count" value={this.state.activeThreadCount}
                          more={` (${this.state.threadCount})`}/>
          <LinearMetricBar label="Memory" percentage={this.state.memory}/>
          <LinearMetricBar label="CPU" percentage={this.state.cpu}/>
          <LinearMetricBar label="File descriptor" percentage={this.state.fileDescriptor}/>
          <LinearMetricBar label="Temp space" percentage={this.state.freeDiskSpaceInTemp.value}
                           displayValue={this.state.freeDiskSpaceInTemp.label}/>
        </div>
        <footer>
          <div className="last-update">{this.state.lastUpdate}</div>
        </footer>
      </section>
    );
  }
}

export default JenkinsMonitoringWidget;

