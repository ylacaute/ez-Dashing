import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

export default class VelocityWidget extends AbstractWidget {

  static propTypes = {
    velocity: PropTypes.array
  };

  static defaultProps = {
    velocity: [ 0 ]
  };

  computeVelocity() {
    let { velocity } = this.props;
    let lastValues = [];
    if (velocity.length > 0) {
      lastValues.push(velocity[velocity.length - 1])
    }
    if (velocity.length > 1) {
      lastValues.push(velocity[velocity.length - 2])
    }
    if (velocity.length > 2) {
      lastValues.push(velocity[velocity.length - 3])
    }
    let sum = lastValues.reduce(function(sum, value) {
      return sum + value;
    }, 0);
    return Math.floor(sum / lastValues.length);
  }

  renderCurrentVelocity() {
    let value = this.computeVelocity();
    return (
      <div>{value}</div>
    )
  }

  renderContent() {
    // TODO
    // if (this.props.velocity.length == 0) {
    //   throw new Error({
    //     name: "velocity Error",
    //     message: "velocity Error"
    //   });
    // }
    return (
      <div>
        {this.renderCurrentVelocity()}
      </div>
    );
  }

}
