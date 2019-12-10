import React from "react";
import PropTypes from 'prop-types';
import "./InputRange.scss"
import cn from "classnames";

class InputRange extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.number,
    step: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onStartDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    step: 1,
    minValue: 0,
    maxValue: 10,
    onStartDrag: () => {},
    onEndDrag: () => {},
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.inputRangeDOM = React.createRef();
    this.state = {
      value: this.props.value
    };
    this.track = React.createRef();
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
    this.setState({
      value: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  render() {
    const { className, disabled, value, step, minValue, maxValue } = this.props;
    const rangeDisabled = disabled ? "disabled" : "";

    const style = {
      "--min": minValue,
      "--max": maxValue,
      "--val": value,
    };
    return (
      <input
        className={cn("input-range", className)}
        disabled={rangeDisabled}
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
