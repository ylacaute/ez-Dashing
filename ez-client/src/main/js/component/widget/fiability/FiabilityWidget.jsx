import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

export default class FiabilityWidget extends AbstractWidget {

  static propTypes = {
    fiability: PropTypes.array
  };

  static defaultProps = {
    fiability: [ 0 ]
  };

  computeFiability() {
    let { fiability } = this.props;
    let lastValues = [];
    if (fiability.length > 0) {
      lastValues.push(fiability[fiability.length - 1])
    }
    if (fiability.length > 1) {
      lastValues.push(fiability[fiability.length - 2])
    }
    if (fiability.length > 2) {
      lastValues.push(fiability[fiability.length - 3])
    }
    let sum = lastValues.reduce(function(sum, value) {
      return sum + value;
    }, 0);
    return Math.floor(sum / lastValues.length);
  }

  renderCurrentFiability() {
    let value = this.computeFiability();
    return (
      <div>{value}%</div>
    )
  }

  renderContent() {
    return (
      <div>
        {this.renderCurrentFiability()}
      </div>
    );
  }

}
