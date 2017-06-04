import React from 'react';
import PropTypes from 'prop-types';

class LinearProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialAnimation ? 0 : props.value
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            value: this.props.value,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  render() {
    const classNames = `progress-bar linear  
      ${this.props.className} 
      ${this.props.classForValue(this.props.value)}`;
    const pathDescription = "M 0,12 L 100,12";
    const progressStyle = { strokeDasharray: `${this.state.value} 100` };
    const displayValue = this.props.displayValue != null ?
        this.props.displayValue : this.props.textForValue(this.state.value);

    return (
      <div className="linear-progress-bar-wrapper">
        <svg className={classNames} width="100%" height="100%" viewBox="0 0 100 12">
          <path
            className="trail"
            d={pathDescription}
            strokeWidth={this.props.strokeWidth}
            fillOpacity={0}/>
          <path
            className="path"
            d={pathDescription}
            strokeWidth={this.props.strokeWidth}
            fillOpacity={0}
            style={progressStyle}/>
          <text className="display-value" x={2} y={8}>
            {displayValue}
          </text>
          <text className="label" x={96} y={8}>
            {this.props.label}
          </text>
        </svg>
      </div>
    );
  }
}

LinearProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  initialAnimation: PropTypes.bool,
  textForValue: PropTypes.func,
  classForValue: PropTypes.func,
  displayValue: PropTypes.string
};

LinearProgressBar.defaultProps = {
  displayValue: null,
  label: '',
  value: 0,
  strokeWidth: 2,
  initialAnimation: true,
  textForValue: (value) => `${value}`,
  classForValue: (value) => ''
};

export default LinearProgressBar;
