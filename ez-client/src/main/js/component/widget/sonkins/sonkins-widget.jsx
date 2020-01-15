import React from "react";
import PropTypes from "prop-types";
import AvatarConfig from "config/avatar-config";
import Metric from "component/widget/base/metric";
import Flip from "component/effect/flip/flip-effect";
import CircularProgressBar from 'component/chart/progress-bar/circular'
import LinearProgressBar from 'component/chart/progress-bar/linear';
import ScalableImage from 'component/scalable/image';
import WidgetHeader from "component/widget/base/widget-header";
import WidgetContent from "component/widget/base/widget-content";
import Widget from "component/widget/base/widget";
import cn from 'classnames';

import "./sonkins-widget.scss";

export default class SonkinsWidget extends React.PureComponent {

  static propTypes = {
    ...Widget.propTypes,
    status: PropTypes.oneOf([
      "FAILURE", "UNSTABLE", "REBUILDING", "BUILDING", "ABORTED", "SUCCESS", "UNKNOWN"
    ]),
    author: PropTypes.string,
    building: PropTypes.bool,
    branch: PropTypes.string.isRequired,
    progress: PropTypes.number,
    lines: PropTypes.number,
    coverage: PropTypes.number,
    violations: PropTypes.number,
  };

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    building: false,
    branch: "master",
    progress: 0,
    lines: 0,
    coverage: 0,
    violations: 0
  };

  state = {
    avatar: "",
  };

  static getDerivedStateFromProps(props) {
    const {className, author, avatars, status, building} = props;
    const avatar = AvatarConfig.get(author, avatars);
    const realStatus = SonkinsWidget.getJenkinsStatus(status, building);

    let content;
    switch (realStatus) {
      case "SUCCESS":
        content = SonkinsWidget.renderBuildSuccess(props);
        break;
      case "BUILDING":
      case "REBUILDING":
        content = SonkinsWidget.renderBuilding(props, avatar);
        break;
      default:
        content = SonkinsWidget.renderBuildFail(avatar);
        break;
    }
    return {
      className: cn("sonkins", className, realStatus.toLowerCase()),
      avatar: avatar,
      content: content,
    };
  }

  /**
   * Get the real status of Jenkins. A trick is necessary as sometimes jenkins returns
   * a null status when building but set a building field to true.
   */
  static getJenkinsStatus(currentStatus, building) {
    return building
      ? "BUILDING"
      : currentStatus
        ? currentStatus
        : "UNKNOWN";
  }

  static renderAuthorMetric(label, iconUrl, singleMetric = false) {
    return (
      <Metric
        single={singleMetric}
        label={label}
        value={
          <ScalableImage className="author" src={iconUrl}/>
        }
      />
    );
  }

  static renderBuilding(props, avatar) {
    return (
      <div>
        <Flip>
          {this.renderAuthorMetric("BUILDING", avatar.url, true)}
          <CircularProgressBar
            value={props.progress}
            textForValue={(value) => `${value}%`}
          />
        </Flip>
        <LinearProgressBar percent={props.progress}/>
      </div>
    );
  }

  static renderBuildFail(avatar) {
    return this.renderAuthorMetric("BUILD FAILURE", avatar.url, true);
  }

  static renderMetric(label, value, thresholds, formatValue) {
    if (!value)
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

  static renderBuildSuccess(props) {
    const {lines, coverage, violations, thresholds} = props;
    return (
      <div className="metrics">
        {this.renderAuthorMetric("Last build")}
        {this.renderMetric("Line", lines, null, n => `${parseInt(n / 1000)}k`)}
        {this.renderMetric("Violations", violations, thresholds.violations, n => n)}
        {this.renderMetric("Coverage", coverage, thresholds.coverage, n => `${n}%`)}
      </div>
    );
  }

  render() {
    const {className, content} = this.state;

    return (
      <Widget
        className={className}
        {...this.props}
      >
        <WidgetHeader
          title={this.props.title}
          subTitle={this.props.branch}
        />
        <WidgetContent>
          {content}
        </WidgetContent>
      </Widget>
    )
  }

}
