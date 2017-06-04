import React from 'react';
import PropTypes from 'prop-types';

import CircularProgressBar from 'js/core/CircularProgressBar.jsx'

class CircularMetric extends React.Component {

  render() {
    return (
      <CircularProgressBar
        className="metric circular"
        value={100}
        displayValue={this.props.displayValue}
        label={this.props.label}
        classForValue={this.props.classForValue}
      />
    );
  }
}

CircularMetric.propTypes = {
  displayValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classForValue: PropTypes.func.isRequired
};

export default CircularMetric;
