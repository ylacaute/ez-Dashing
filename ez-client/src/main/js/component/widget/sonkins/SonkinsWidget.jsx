import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import AvatarConfig from "config/AvatarConfig";
import Metric from "component/widget/base/Metric.jsx";


export default class SonkinsWidget extends AbstractWidget {

  static propTypes = {
    status: PropTypes.oneOf([
      "FAILURE", "UNSTABLE", "REBUILDING", "BUILDING", "ABORTED", "SUCCESS", "UNKNOWN"
    ]),
    author: PropTypes.string,
    goodBuildUrl: PropTypes.string,
    lines: PropTypes.number,
    coverage: PropTypes.number,
    violations: PropTypes.number
  };

  static defaultProps = {
    status: "UNKNOWN",
    author: "",
    goodBuildUrl: "/img/good.png",
    lines: 0,
    coverage: 0,
    violations: 0
  };


  renderContent() {
    const { status, lines, coverage, violations, author, avatars } = this.props;
    const avatar = AvatarConfig.get(author, avatars);
    let url = avatar.url;

    if (status != "FAILURE") {
      url = this.props.goodBuildUrl;
    }
    return (
      <div>
        <Metric
          label="Last build"
          value={ <img draggable="false" src={url} /> }
        />
        <Metric
          label="Lines"
          value={lines}
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

}






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
