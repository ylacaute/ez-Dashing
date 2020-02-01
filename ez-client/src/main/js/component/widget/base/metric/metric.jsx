import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ThresholdConfig from "config/threshold-config";
import TypeUtils from "utils/type-utils";
import AnimatedNumber from 'react-animated-number';

import "./metric.scss"

// Deprecated
export default class Metric extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    formatValue: PropTypes.func,
    animated: PropTypes.bool,
    thresholds: PropTypes.object,
    single: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    label: '',
    value: {},
    formatValue: n => n,
    animated: true,
    thresholds: null,
    single: false
  };

  state = {
    classNameWrapper: "",
    className: "",
    value: null
  };

  static getDerivedStateFromProps(props, state) {
    const {className, value, formatValue, thresholds, single, animated} = props;

    return {
      classNameWrapper: cn("metric-wrapper", single ? "single" : null),
      className: cn("metric", className, ThresholdConfig.get(thresholds, value)),
      value: Metric.renderValue(value, formatValue, animated)
    }
  }


  static renderValue(value, formatValue, animated) {
    const renderedValue = <div className="value">{value}</div>;
    const isFloat = TypeUtils.isFloat(value);
    const isInt = TypeUtils.isInt(value);

    if (animated && (isFloat || isInt)) {
      let formatFunc = formatValue;
      if (isInt) {
        formatFunc = n => formatValue(parseInt(n));
      }
      return (
        <AnimatedNumber
          component="div"
          className="value"
          stepPrecision={2}
          value={value}
          style={{transition: '0.8s ease-out'}}
          duration={500}
          formatValue={formatFunc}/>
      )
    }
    return renderedValue;
  }

  render() {
    const {label} = this.props;
    const {classNameWrapper, className, value} = this.state;

    return (
      <div className={classNameWrapper}>
        <div className={className}>
          {value}
          <div className="name">
            {label}
          </div>
        </div>
      </div>
    )
  }
}


