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
    lines: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    coverage: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    violations: PropTypes.oneOf([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    branch: "master",
    building: false,
    progress: 0,
    lines: null,
    coverage: null,
    violations: null
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

  renderMetric(label, value, thresholds, formatValue) {
    if (value == null)
      return null;
    return (
      <Metric
        label={label}
        value={value}
        thresholds={thresholds}
        formatValue={formatValue}
      />
    )
  }

  renderBuildSuccess() {
    const { lines, coverage, violations } = this.props;
    return (
      <div className="metrics">
        {this.renderAuthorMetric("Last build")}
        {this.renderMetric("Line", lines, null, n => `${parseInt(Number(n) / 1000)}k`)}
        {this.renderMetric("Violations", violations, this.props.thresholds.violations, n => n)}
        {this.renderMetric("Coverage", coverage, this.props.thresholds.coverage, n => `${n}%`)}
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
