import React from 'react';
import PropTypes from 'prop-types';

import SimpleMetric from 'js/metric/base/SimpleMetric.jsx';
import ThresholdConfig from 'js/config/ThresholdConfig.jsx'

class BugsMetric extends React.Component {

  render() {
    return (
      <SimpleMetric
        className="metric bugs"
        label="Opened"
        value={this.props.value}
        fixedValueWidth={20}
        fixedLabelWidth={60}
        classForValue={(val) => ThresholdConfig.get(this.props.thresholds, val)}
      />
    );
  }
}

BugsMetric.propTypes = {
  value: PropTypes.number.isRequired,
  thresholds: PropTypes.object
};

export default BugsMetric;
