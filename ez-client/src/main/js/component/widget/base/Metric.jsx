import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ThresholdConfig from "config/ThresholdConfig";
import TypeUtils from "utils/TypeUtils";
import AnimatedNumber from 'react-animated-number';

export default class Metric extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.node,
    animated: PropTypes.bool,
    thresholds: PropTypes.object
  };

  static defaultProps = {
    className: '',
    label: '',
    value: {},
    animated: true,
    thresholds: null
  };

  renderValue(value) {
    if (TypeUtils.isNumber(value) && this.props.animated) {
      return (
        <AnimatedNumber component="div"
                        className="value"
                        value={value}
                        style={{transition: '0.8s ease-out' }}
                        duration={2000}
                        formatValue={n => parseInt(n)}/>
      )
    } else {
      return <div className="value">{value}</div>
    }
  }

  render() {
    const { className, label, value, thresholds } = this.props;

    return (
      <div className={cn("metric", className, ThresholdConfig.get(thresholds, value))}>
        <div>
          {this.renderValue(value)}
          <div className="name">{label}</div>
        </div>
      </div>
    )
  }
}


