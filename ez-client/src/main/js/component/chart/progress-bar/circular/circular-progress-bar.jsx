import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";

import "./circular-progress-bar.scss"

export default class CircularProgressBar extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    initialAnimation: PropTypes.bool,
    classForValue: PropTypes.func,
    textForValue: PropTypes.func,
    displayValue: PropTypes.number,
    displayValueStyle: PropTypes.any,
  };

  static defaultProps = {
    label: '',
    value: 0,
    strokeWidth: 3,
    classForValue: (value, displayValue) => '',
    textForValue: (value) => `${value}`,
    displayValue: null,
    displayValueStyle: {}
  };

  state = {
    value: 0
  };

  static getDerivedStateFromProps(props, state) {
    const {
      className,
      classForValue,
      value,
      displayValue,
      strokeWidth,
      textForValue,
      label
    } = props;
    const radius = 50 - strokeWidth / 2;
    const diameter = Math.PI * 2 * radius;

    return {
      className: cn("progress-bar circular", className, classForValue(value, displayValue)),
      strokeWidth: strokeWidth,
      radius: radius,
      diameter: diameter,
      progressStyle: {
        strokeDasharray: `${diameter}px ${diameter}px`,
        strokeDashoffset: `${((100 - state.value) / 100 * diameter)}px`,
      },
      pathDescription: `
        M 50,50 m 0,-${radius}
        a ${radius},${radius} 0 1 1 0,${2 * radius}
        a ${radius},${radius} 0 1 1 0,-${2 * radius}
      `,
      displayValue: displayValue || textForValue(value),
      displayValueY: (label && label !== '') ? 45 : 53
    };
  }

  componentDidMount() {
    this.initialTimeout = setTimeout(() => {
      this.setState({
        value: this.props.value,
      });
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
  }

  render() {
    const {label, displayValueStyle} = this.props;
    const {
      className,
      strokeWidth,
      pathDescription,
      progressStyle,
      displayValue,
      displayValueY
    } = this.state;

    return (
      <div className="progress-bar-wrapper">
        <svg className={className} width="100%" viewBox="0 0 100 100">
          <path
            className="trail"
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}/>
          <path
            className="path"
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}
            style={progressStyle}/>
          <text className="display-value" x={50} y={displayValueY} style={displayValueStyle}>
            {displayValue}
          </text>
          <text className="label" x={50} y={70}>
            {label}
          </text>
        </svg>
      </div>
    );
  }
}
