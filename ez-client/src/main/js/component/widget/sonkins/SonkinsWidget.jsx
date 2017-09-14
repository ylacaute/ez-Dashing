import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import AvatarConfig from "config/AvatarConfig";
import Metric from "component/widget/base/Metric.jsx";
import FlipComponent from "component/effect/FlipComponent.jsx";
import CircularProgressBar from 'component/chart/CircularProgressBar.jsx'
import LinearProgressBar from 'component/chart/LinearProgressBar.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';

export default class SonkinsWidget extends AbstractWidget {

  static propTypes = {
    status: PropTypes.oneOf([
      "FAILURE", "UNSTABLE", "REBUILDING", "BUILDING", "ABORTED", "SUCCESS", "UNKNOWN"
    ]),
    author: PropTypes.string,
    building: PropTypes.bool,
    branch: PropTypes.string,
    progress: PropTypes.number,
    lines: PropTypes.number,
    coverage: PropTypes.number,
    violations: PropTypes.number
  };

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    branch: "master",
    building: false,
    progress: 0,
    lines: 0,
    coverage: 0,
    violations: 0
  };

  /**
   * Return the real status of Jenkins.
   * Indeed sometimes jenkins returns a null status when building and set a building boolean to true.
   */
  getStatus() {
    return this.props.building ? "BUILDING" :
      this.props.status != null ? this.props.status :
        "UNKNOWN";
  }

  getWidgetClassNames() {
    return super
      .getWidgetClassNames()
      .concat(this.getStatus().toLowerCase());
  }

  renderHeader() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <strong>{this.props.branch}</strong>
      </div>
    )
  }

  renderAuthorMetric(label, iconUrl, singleMetric = false) {
    return (
      <Metric
        single={singleMetric}
        label={label}
        value={
          <ScalableImage className="author" src={iconUrl} />
        }
      />
    );
  }

  renderBuilding(avatar) {
    return (
      <div>
        <FlipComponent>
          {this.renderAuthorMetric("BUILDING", avatar.url, true)}
          <CircularProgressBar
            value={this.props.progress}
            textForValue={(value) => `${value}%`}
          />
        </FlipComponent>
        <LinearProgressBar percent={this.props.progress}/>
      </div>
    );
  }

  renderBuildFail(avatar) {
    return this.renderAuthorMetric("BUILD FAILURE", avatar.url, true);
  }

  renderBuildSuccess() {
    const { lines, coverage, violations } = this.props;
    return (
      <div className="metrics">
        {this.renderAuthorMetric("Last build")}
        <Metric
          label="Lines"
          value={lines}
          formatValue={n => `${parseInt(n / 1000)}k`}
        />
        <Metric
          label="Violations"
          value={violations}
          thresholds={this.props.thresholds.violations}
        />
        <Metric
          label="Coverage"
          value={coverage}
          formatValue={n => `${n}%`}
          thresholds={this.props.thresholds.coverage}
        />
      </div>
    );
  }

  renderContent() {
    const { author, avatars } = this.props;
    const avatar = AvatarConfig.get(author, avatars);

    switch (this.getStatus()) {
      case "SUCCESS":
        return this.renderBuildSuccess();
      case "BUILDING":
      case "REBUILDING":
        return this.renderBuilding(avatar);
      default:
        return this.renderBuildFail(avatar);
    }
  }

}
