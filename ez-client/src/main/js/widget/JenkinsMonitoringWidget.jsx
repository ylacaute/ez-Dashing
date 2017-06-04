import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import JenkinsClient from 'js/client/JenkinsClient.jsx';
import LinearProgressBar from 'js/core/LinearProgressBar.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';
import ScalableText from 'js/core/ScalableText.jsx';
import ThresholdConfig from 'js/config/ThresholdConfig.jsx';

class JenkinsMonitoringWidget extends RefreshableWidget {

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

  renderAfterTitle() {
    return (
      <div className="afterTitle">
        <ScalableText
          className="version"
          text={`V${this.state.version}`}
          textAnchor="middle"
          wViewPort={50}
        />
        <div className="last-update">
          <ScalableText
            text={this.state.lastUpdate}
            textAnchor="middle"
          />
        </div>
      </div>
    );
  }

  renderContent() {
    const classForValue = (val) => ThresholdConfig.get(this.props.thresholds, val);
    const textForValue = (value) => `${value} %`;
    const threadPercent = this.state.threadCount / 100 * this.state.activeThreadCount;
    return (
      <div>
        <LinearProgressBar
          label="Thread"
          value={threadPercent}
          displayValue={`${this.state.activeThreadCount}`}
          classForValue={classForValue}
        />
        <LinearProgressBar
          label="Memory"
          value={this.state.memory}
          textForValue={textForValue}
          classForValue={classForValue}
        />
        <LinearProgressBar
          label="CPU"
          value={this.state.cpu}
          textForValue={textForValue}
          classForValue={classForValue}
        />
        <LinearProgressBar
          label="File descriptor"
          value={this.state.fileDescriptor}
          textForValue={textForValue}
          classForValue={classForValue}
        />
        <LinearProgressBar
          label="Free space"
          value={this.state.freeDiskSpaceInTemp.value}
          displayValue={this.state.freeDiskSpaceInTemp.label}
          textForValue={textForValue}
          classForValue={classForValue}
        />
      </div>
    );
  }

  getGlobalHealth() {
    const s = this.state;
    const threadPercent = this.state.threadCount / 100 * this.state.activeThreadCount;
    const kpis = [threadPercent, s.memory, s.cpu, s.fileDescriptor, s.freeDiskSpaceInTemp];
    let result = "good";
    for (let kpi of kpis) {
      let health = ThresholdConfig.get(this.props.thresholds, kpi);
      if (health == "bad") {
        result = "bad";
        break;
      }
      if (health == "avg") {
        result = "avg";
      }
    }
    return result;
  }

  render() {
    return (
      <Widget
        className={`jenkins-monitoring ${this.getGlobalHealth()}`}
        title={this.props.displayName}
        afterTitle={this.renderAfterTitle()}
        content={this.renderContent()}
      />
    );
  }

}

JenkinsMonitoringWidget.propTypes = {
  displayName: PropTypes.string
};

export default JenkinsMonitoringWidget;

