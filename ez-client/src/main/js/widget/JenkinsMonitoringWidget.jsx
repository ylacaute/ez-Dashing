import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'widget/base/Widget.jsx';
import JenkinsClient from 'client/JenkinsClient.js';
import LinearProgressBar from 'core/LinearProgressBar.jsx';
import RefreshableWidget from 'widget/base/RefreshableWidget.jsx';
import ScalableText from 'core/ScalableText.jsx';
import ThresholdConfig from 'config/ThresholdConfig';
import ByteUtils from 'utils/ByteUtils.js';

const NO_DATE = '--/-- --:--';

class JenkinsMonitoringWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      exception: null,
      lastUpdate: NO_DATE,
      version: '--',
      memoryUsage: 0,
      cpuUsage: 0,
      fileDescriptorUsage: 0,
      freeDiskSpaceInTemp: 0
    };
  }

  refreshData() {
    JenkinsClient.getMonitoring((jsonResponse) => {
      this.setState({
        loaded: true,
        lastUpdate: jsonResponse.lastUpdate,
        version: jsonResponse.version,
        memoryUsage: jsonResponse.memoryUsage,
        cpuUsage: jsonResponse.cpuUsage,
        fileDescriptorUsage: jsonResponse.fileDescriptorUsage,
        activeThreadCount: jsonResponse.activeThreadCount,
        freeDiskSpaceInTemp: jsonResponse.freeDiskSpaceInTemp
      });
      // FIXME: why http response 500 is not catched ?
      if (jsonResponse.message == "Internal Server Error")
        throw { name: "Error 500", message: "Server error" }
    }, (exception) => {
      console.log("Error during Jenkins monitoring request, details: ", exception);
      this.setState({exception: exception});
    });
  }

  renderAfterTitle() {
    const version = this.state.version != null ? this.state.version : '--';
    const lastUpdate = this.state.lastUpdate != null ? this.state.lastUpdate : NO_DATE;
    return (
      <div className="afterTitle">
        <ScalableText
          className="version"
          text={`${version}`}
          textAnchor="middle"
          wViewPort={50}
        />
        <div className="last-update">
          <ScalableText
            text={lastUpdate}
            textAnchor="middle"
          />
        </div>
      </div>
    );
  }

  getFreeSpaceInTempData() {
    const freeDiskSpaceInTempValue = this.state.freeDiskSpaceInTemp < this.props.diskSpaceInTemp ?
      this.state.freeDiskSpaceInTemp : this.props.diskSpaceInTemp;
    const freeDiskSpaceInTempUsage = freeDiskSpaceInTempValue / this.props.diskSpaceInTemp * 100;
    const freeDiskSpaceInTempLabel = ByteUtils.asLabel(this.state.freeDiskSpaceInTemp);
    return {
      value: freeDiskSpaceInTempValue,
      label: freeDiskSpaceInTempLabel,
      usage: freeDiskSpaceInTempUsage
    }
  }

  renderContent() {
    if (this.state.exception != null) {
      return this.renderError(this.state.exception);
    }
    if (this.state.loaded == false) {
      return this.renderLoadingContent();
    }
    const textForValue = (value) => `${value} %`;
    const displayValuePosition = {x: 2, y: 10};
    const labelPosition = {x:96, y: 10};
    const freeSpace = this.getFreeSpaceInTempData();

    return (
      <div>
        <LinearProgressBar
          label="Memory"
          value={this.state.memoryUsage}
          textForValue={textForValue}
          classForValue={(val) => ThresholdConfig.get(this.props.thresholds.memoryUsage, val)}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
        <LinearProgressBar
          label="CPU"
          value={this.state.cpuUsage}
          textForValue={textForValue}
          classForValue={(val) => ThresholdConfig.get(this.props.thresholds.cpuUsage, val)}
          displayValuePosition={displayValuePosition}
        />
        <LinearProgressBar
          label="File descriptors"
          value={this.state.fileDescriptorUsage}
          textForValue={textForValue}
          classForValue={(val) => ThresholdConfig.get(this.props.thresholds.fileDescriptorUsage, val)}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
        <LinearProgressBar
          label="Free temp space"
          value={freeSpace.usage}
          displayValue={freeSpace.label}
          textForValue={textForValue}
          classForValue={(val) => ThresholdConfig.get(this.props.thresholds.freeDiskSpaceInTemp, val)}
          displayValuePosition={displayValuePosition}
          labelPosition={labelPosition}
        />
      </div>
    );
  }

  getGlobalHealth() {
    const kpis = {
      memoryUsage: this.state.memoryUsage,
      cpuUsage: this.state.cpuUsage,
      fileDescriptorUsage: this.state.fileDescriptorUsage,
      freeDiskSpaceInTemp: this.getFreeSpaceInTempData().usage
    };
    let result = "good";
    if (this.props.thresholds == null)
      return result;
    for (let kpi in kpis) {
      let health = ThresholdConfig.get(this.props.thresholds[kpi], kpis[kpi]);
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
        title={this.props.title}
        afterTitle={this.renderAfterTitle()}
        content={this.renderContent()}
      />
    );
  }

}

JenkinsMonitoringWidget.propTypes = {
  title: PropTypes.string,
  thresholds: PropTypes.object,
  diskSpaceInTemp: PropTypes.number
};

// Disk space in Mo
JenkinsMonitoringWidget.defaultProps = {
  thresholds: null,
  diskSpaceInTemp: 10000,
  refreshEvery: 60
};

export default JenkinsMonitoringWidget;
