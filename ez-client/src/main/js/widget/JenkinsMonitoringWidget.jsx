import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import LinearProgressBar from 'js/chart/LinearProgressBar.jsx';
import BaseWidget from 'js/widget/BaseWidget.jsx';
import LabelWithValue from 'js/fragment/LabelWithValue.jsx';

class JenkinsMonitoringWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: '',
      version: '',
      memory: 0,
      cpu: 0,
      fileDescriptor: 0,
      threadCount: 0,
      activeThreadCount: 0,
      freeDiskSpaceInTemp: 0
    };
  }

  componentDidMount() {
    JenkinsClient.getJenkinsInfo((jsonResponse) => {
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


  /*
   Suppress warning ...

   <LinearMetricBar label="Temp space" percentage={this.state.freeDiskSpaceInTemp.value}
   displayValue={this.state.freeDiskSpaceInTemp.label}/>
   */

  render() {
    const classForValue = (val) => {
      if (val >= 95) return "bad";
      if (val >= 80) return "avg";
      return "good";
    };
    const percent = (value) => `${value} %`;
    return (
      <Widget
        className="jenkins-monitoring"
        title={this.props.displayName}
        subTitle={this.state.version}
        content={
          <div>
            <LabelWithValue
              label="Active thread count"
              value={this.state.activeThreadCount}
              more={` (${this.state.threadCount})`}/>
            <LinearProgressBar
              label="Memory"
              value={this.state.memory}
              textForValue={percent}
              classForValue={classForValue}/>
            <LinearProgressBar
              label="CPU"
              value={this.state.cpu}
              textForValue={percent}
              classForValue={classForValue}/>
            <LinearProgressBar
              label="File descriptor"
              value={this.state.fileDescriptor}
              textForValue={percent}
              classForValue={classForValue}/>
          </div>
        }
        footer={
          <div className="last-update">{this.state.lastUpdate}</div>
        }
      />
    );
  }

}

JenkinsMonitoringWidget.propTypes = {
  displayName: PropTypes.string
};

export default JenkinsMonitoringWidget;

