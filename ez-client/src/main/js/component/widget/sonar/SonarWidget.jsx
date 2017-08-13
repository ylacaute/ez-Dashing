import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import ThresholdConfig from "config/ThresholdConfig";

class SonarWidget extends AbstractWidget {

  static propTypes = {
    logoUrl: PropTypes.string,
    lines: PropTypes.string,
    coverage: PropTypes.string,
    violations: PropTypes.string
  };

  static defaultProps = {
    logoUrl: '/img/logo.png',
    lines: "0",
    coverage: "0",
    violations: "0"
  };

  /*
          <div className="metric">Coverage: {coverage}</div>
        <div className="metric">Violations: {violations}</div>

   */
  renderContent() {
    const lines = parseInt(this.props.lines);
    const coverage = parseFloat(this.props.coverage);
    const violations = parseInt(this.props.violations);

    const linesMetricClass = "metric";
    const violationMetricClass = "metric " + ThresholdConfig.get(this.props.thresholds.violations, violations);
    const coverageMetricClass = "metric " + ThresholdConfig.get(this.props.thresholds.coverage, coverage);

    return (
      <div>
        <div className={linesMetricClass}>
          <div className="value">{lines}</div>
          <div className="name">Lines</div>
        </div>
        <div className={violationMetricClass}>
          <div className="value">{violations}</div>
          <div className="name">Violations</div>
        </div>
        <div className={coverageMetricClass}>
          <div className="value">{coverage}</div>
          <div className="name">Coverage</div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  //console.log("Receive state : ", state);
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};


export default connect(mapStateToProps)(SonarWidget)
