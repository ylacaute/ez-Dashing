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

  static propTypes = Object.assign({
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
  }, Widget.propTypes);

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    branch: "master",
    building: false,
    progress: 0,
  };

  /**
   * Get the real status of Jenkins. A trick is necessary as sometimes jenkins returns
   * a null status when building but set a building field to true.
   */
  getJenkinsStatus() {
    return this.props.building ? "BUILDING" :
      this.props.status != null ? this.props.status :
        "UNKNOWN";
  }

  renderAuthorMetric(label, iconUrl, singleMetric = false) {
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

  renderBuilding(avatar) {
    return (
      <div>
        <Flip>
          {this.renderAuthorMetric("BUILDING", avatar.url, true)}
          <CircularProgressBar
            value={this.props.progress}
            textForValue={(value) => `${value}%`}
          />
        </Flip>
        <LinearProgressBar percent={this.props.progress}/>
      </div>
    );
  }

  renderBuildFail(avatar) {
    return this.renderAuthorMetric("BUILD FAILURE", avatar.url, true);
  }

  renderMetric(label, value, thresholds, formatValue) {
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

  renderBuildSuccess() {
    const {lines, coverage, violations, thresholds} = this.props;
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
    const {className, author, avatars} = this.props;
    const avatar = AvatarConfig.get(author, avatars);
    const classNames = cn("sonkins", className, this.getJenkinsStatus().toLowerCase());
    let content;

    switch (this.getJenkinsStatus()) {
      case "SUCCESS":
        content = this.renderBuildSuccess();
        break;
      case "BUILDING":
      case "REBUILDING":
        content = this.renderBuilding(avatar);
        break;
      default:
        content = this.renderBuildFail(avatar);
        break;
    }
    return (
      <Widget
        className={classNames}
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
