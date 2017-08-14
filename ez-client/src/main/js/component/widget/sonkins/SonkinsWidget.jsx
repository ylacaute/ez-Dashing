import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import LinearProgressBar from "component/chart/LinearProgressBar.jsx";
import AvatarConfig from "config/AvatarConfig";
import ScalableImage from "component/scalable/ScalableImage.jsx";
import Metric from "component/widget/base/Metric.jsx";


class SonkinsWidget extends AbstractWidget {

  static propTypes = {
    status: PropTypes.oneOf([
      "FAILURE", "UNSTABLE", "REBUILDING", "BUILDING", "ABORTED", "SUCCESS", "UNKNOWN"
    ]),
    author: PropTypes.string,
    lines: PropTypes.number,
    coverage: PropTypes.number,
    violations: PropTypes.number
  };

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    lines: 0,
    coverage: 0,
    violations: 0
  };


  /*

  textForValue={textForValue}
        classForValue={(val) => ThresholdConfig.get(this.props.thresholds.memoryUsage, val)}
        displayValuePosition={displayValuePosition}


        <LinearProgressBar
          label="Memory"
          value={85}
          textForValue={(value) => `Coverage: ${value}%`}
        />






<div className="metric image">
          <div>
            <div className="value">
              <img
                draggable="false"
                src={avatar.url}
              />
            </div>
            <div className="name">Last build</div>
          </div>
        </div>
   */
  renderContent() {
    const { lines, coverage, violations, author, avatars } = this.props;

    let avatar = AvatarConfig.get(author, avatars);
//<ScalableImage src={avatar.url}/>
    return (
      <div>
        <Metric className="lines" label="Last build" value={
          <img draggable="false" src={avatar.url} />}
        />
        <Metric label="Lines" value={lines} />
        <Metric label="Violations" value={violations} thresholds={this.props.thresholds.violations} />
        <Metric label="Coverage" value={coverage} thresholds={this.props.thresholds.coverage} />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};


export default connect(mapStateToProps)(SonkinsWidget)
