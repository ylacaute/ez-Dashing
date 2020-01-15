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
    firstLoad: true,
    value: 0,
    style: {
      width: 0
    }
  };

  /**
   * In order to have a animation the first load, we use the componentDidMount to update
   * the width with a timeout.
   * We don't need this trick the next updates as there is CSS animation.
   */
  static getDerivedStateFromProps(props, state) {
    const {value, className} = props;
    const normalizedValue = value < 0 ? 0 : value > 100 ? 100 : value;

    return {
      className: cn("progress-bar linear trail", className),
      firstLoad: false,
      value: normalizedValue,
      style: {
        width: state.firstLoad ? 0 : `${normalizedValue}%`
      }
    }
  }

  componentDidMount() {
    const {value} = this.state;
    const timeout = setTimeout(() => {
      this.setState({
        style: {
          width: `${value}%`
        }
      });
      clearTimeout(timeout);
    }, 200);
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
