import React from "react";
import PropTypes from 'prop-types';
import cn from "classnames";

import "./input-range.scss";

class InputRange extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    step: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onStartDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    value: 0,
    valueBind: false,
    defaultValue: 0,
    step: 1,
    minValue: 0,
    maxValue: 10,
    onStartDrag: () => {},
    onEndDrag: () => {},
    onChange: () => {}
  };

  state = {
    value: -1
  };

  constructor(props) {
    super(props);
    this.inputRangeDOM = React.createRef();
    this.track = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    const {className, disabled, defaultValue, value, minValue, maxValue} = props;
    const valueBind = !!value;
    const rangeValue = valueBind
      ? value
      : state.value === -1 ? defaultValue || 0 : state.value;
    return {
      value: rangeValue,
      valueBind: valueBind,
      className: cn("input-range", className),
      disabled: disabled ? "disabled" : "",
      style: {
        "--min": minValue,
        "--max": maxValue,
        "--val": rangeValue,
      }
    }
  }

  handleMouseDown(event) {
    event.stopPropagation();
    this.props.onStartDrag(event.target.value);
  }

  handleMouseUp(event) {
    event.stopPropagation();
    this.props.onEndDrag(event.target.value);
  }

  handleChange(event) {
    const {minValue, maxValue} = this.props;
    const {valueBind} = this.state;
    const newValue = event.target.value;

    if (!valueBind) {
      this.setState({
        value: newValue,
        style: {
          "--min": minValue,
          "--max": maxValue,
          "--val": newValue,
        }
      });
    }
    this.props.onChange(newValue);
  }

  render() {
    const {step, minValue, maxValue} = this.props;
    const {className, disabled, value, style} = this.state;

    return (
      <input
        className={className}
        disabled={disabled}
        style={style}
        ref={this.inputRangeDOM}
        type="range"
        step={step}
        min={minValue}
        max={maxValue}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        onChange={this.handleChange.bind(this)}
        value={value}
      />
    );
  }
}

export default InputRange;
