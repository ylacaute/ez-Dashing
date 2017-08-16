import React from 'react';
import PropTypes from 'prop-types';

export default class LinearProgressBar extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    initialAnimation: PropTypes.bool,
    textForValue: PropTypes.func,
    classForValue: PropTypes.func,
    displayValue: PropTypes.string,
    className: PropTypes.string,
    displayValuePosition: PropTypes.object,
    labelPosition: PropTypes.object,
  };

  static defaultProps = {
    displayValue: null,
    label: '',
    strokeWidth: 2,
    initialAnimation: true,
    textForValue: (value) => `${value}`,
    classForValue: (value) => '',
    className: '',
    displayValuePosition: { x: 2, y: 8 },
    labelPosition: { x: 96, y: 8 }
  };


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
    const { displayValuePosition, labelPosition, strokeWidth } = this.props;
    return (
      <div className="linear-progress-bar-wrapper">
        <svg className={classNames} width="100%" height="100%" viewBox="0 0 100 12">
          <path
            className="trail"
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0} />
          <path
            className="path"
            d={pathDescription}
            strokeWidth={strokeWidth}
            fillOpacity={0}
            style={progressStyle} />
          <text className="display-value" x={displayValuePosition.x} y={displayValuePosition.y}>
            {displayValue}
          </text>
          <text className="label" x={labelPosition.x} y={labelPosition.y}>
            {this.props.label}
          </text>
        </svg>
      </div>
    );
  }
}
