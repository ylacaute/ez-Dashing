import React from 'react';
import {string, number, func, bool, object, oneOfType} from 'prop-types';
import cn from "classnames";

import "./circular-progress-bar.scss"

export default class CircularProgressBar extends React.PureComponent {

  static propTypes = {
    label: string,
    value: number.isRequired,
    strokeWidth: number,
    initialAnimation: bool,
    classForValue: func,
    textForValue: func,
    displayValue: oneOfType([number, string]),
    displayValueStyle: object,
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
    firstLoad: true,
    value: 0
  };

  static getDerivedStateFromProps(props, state) {
    const {firstLoad} = state;
    const {
      className,
      classForValue,
      displayValue,
      strokeWidth,
      textForValue,
      label
    } = props;
    const radius = 50 - strokeWidth / 2;
    const diameter = Math.PI * 2 * radius;
    const value = firstLoad ? 0 : props.value;
    return {
      firstLoad: false,
      className: cn("progress-bar circular", className, classForValue(value, displayValue)),
      strokeWidth: strokeWidth,
      radius: radius,
      diameter: diameter,
      progressStyle: {
        strokeDasharray: `${diameter}px ${diameter}px`,
        strokeDashoffset: `${((100 - value) / 100 * diameter)}px`,
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
    const {value} = this.props;
    const timeout = setTimeout(() => {
      this.setState({
        value: value,
      });
      clearTimeout(timeout);
    }, 200);
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
