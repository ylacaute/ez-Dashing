import React from 'react';
import PropTypes from 'prop-types';

export default class CircularProgressBar extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    initialAnimation: PropTypes.bool,
    classForValue: PropTypes.func,
    textForValue: PropTypes.func,
    displayValue: PropTypes.number,
  };

  static defaultProps = {
    displayValue: null,
    label: '',
    value: 0,
    strokeWidth: 3,
    initialAnimation: true,
    textForValue: (value) => `${value}`,
    classForValue: (value, displayValue) => ''
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialAnimation ? 0 : props.value,
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
      }, 200);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     value: nextProps.value,
  //   });
  // }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  render() {
    const classNames = `progress-bar circular ${this.props.className} 
      ${this.props.classForValue(this.props.value, this.props.displayValue)}`;
    const largerStrokeWidth = this.props.strokeWidth + 1.2;
    const radius = (50 - largerStrokeWidth / 2);
    const diameter = Math.PI * 2 * radius;
    const progressStyle = {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${((100 - this.state.value) / 100 * diameter)}px`,
    };
    const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;
    const displayValue = this.props.displayValue != null ? this.props.displayValue
      : this.props.textForValue(this.state.value);
    const displayValueY = (this.props.label != null && this.props.label != '') ? 45 : 53;

    return (
      <div className="progress-bar-wrapper">
        <svg className={classNames} width="100%" viewBox="0 0 100 100">
          <path
            className="trail"
            d={pathDescription}
            strokeWidth={this.props.strokeWidth}
            fillOpacity={0}/>
          <path
            className="path"
            d={pathDescription}
            strokeWidth={largerStrokeWidth}
            fillOpacity={0}
            style={progressStyle}/>
          <text className="display-value" x={50} y={displayValueY}>
            {displayValue}
          </text>
          <text className="label" x={50} y={70}>
            {this.props.label}
          </text>
        </svg>
      </div>
    );
  }
}
