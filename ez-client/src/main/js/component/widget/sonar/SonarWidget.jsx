import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import Metric from 'component/widget/base/Metric.jsx';

export default class SonarWidget extends AbstractWidget {

  static propTypes = {
    logoUrl: PropTypes.string,
    lines: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    coverage: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    violations: PropTypes.oneOf([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    logoUrl: 'img/logo.png',
    lines: 0,
    coverage: 0,
    violations: 0
  };

  renderContent() {
    const { lines, coverage, violations } = this.props;
    return (
      <div>
        <Metric
          label="Lines"
          value={lines}
          formatValue={n => `${parseInt(Number(n) / 1000)}k`}
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
