import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import Metric from 'component/widget/base/Metric.jsx';

export default class SonarWidget extends AbstractWidget {

  static propTypes = {
    logoUrl: PropTypes.string,
    lines: PropTypes.number,
    coverage: PropTypes.number,
    violations: PropTypes.number
  };

  static defaultProps = {
    logoUrl: '/img/logo.png',
    lines: 0,
    coverage: 0,
    violations: 0
  };

  renderContent() {
    const { lines, coverage, violations } = this.props;
    return (
      <div>
        <Metric label="Lines" value={lines} />
        <Metric label="Violations" value={violations} thresholds={this.props.thresholds.violations}/>
        <Metric label="Coverage" value={coverage} thresholds={this.props.thresholds.coverage}/>
      </div>
    );
  }

}
