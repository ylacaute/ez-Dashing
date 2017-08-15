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
    formatValue: PropTypes.func,
    animated: PropTypes.bool,
    thresholds: PropTypes.object
  };

  static defaultProps = {
    className: '',
    label: '',
    value: {},
    formatValue: n => n,
    animated: true,
    thresholds: null
  };

  renderValue(value, formatValue) {
    const renderedValue = <div className="value">{value}</div>;
    const isFloat = TypeUtils.isFloat(value);
    const isInt = TypeUtils.isInt(value);

    if (this.props.animated && (isFloat || isInt)) {
      let formatFunc = formatValue;
      if (isInt) {
        formatFunc = n => parseInt(formatValue(n));
      }
      return (
        <AnimatedNumber component="div"
                        className="value"
                        stepPrecision={2}
                        value={value}
                        style={{transition: '0.8s ease-out' }}
                        duration={500}
                        formatValue={formatFunc}/>
      )
    }
    return renderedValue;
  }

  render() {
    const { className, label, value, formatValue, thresholds } = this.props;

    return (
      <div className={cn("metric", className, ThresholdConfig.get(thresholds, value))}>
        <div>
          {this.renderValue(value, formatValue)}
          <div className="name">{label}</div>
        </div>
      </div>
    )
  }
}


