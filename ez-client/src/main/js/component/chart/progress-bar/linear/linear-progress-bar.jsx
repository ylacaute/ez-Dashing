import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./linear-progress-bar.scss"

export default class LinearProgressBar extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.number.isRequired
  };

  static defaultProps = {
    className: "",
    value: 0
  };

  state = {
    className: "",
    value: 0,
    style: {}
  };

  static getDerivedStateFromProps(props) {
    const {value, className} = props;
    const normalizedValue = value < 0 ? 0 : value > 100 ? 100 : value;
    return {
      className: cn("progress-bar linear trail", className),
      value: normalizedValue,
      style: {
        width: `${normalizedValue}%`
      }
    }
  }

  render() {
    const {className, style} = this.state;

    return (
      <div className={className}>
        <div className="path" style={style}/>
        <div className="trail"/>
      </div>
    );
  }
}
