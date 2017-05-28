import React from 'react';
import PropTypes from 'prop-types';

class LinearProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  getClassNames() {
    let className = "linear-progress-bar " + this.props.styleName + " ";
    if (this.props.classForPercentage) {
      className += this.props.classForPercentage(this.props.percentage);
    }
    return className;
  }

  render() {
    const pathDescription = "M 0,1 L 100,1";
    const progressStyle = {
      strokeDasharray: `${this.state.percentage} 100`,
      strokeDashoffset: "0"
    };
    console.log("styleName : " + this.props.styleName);
    return (
      <div>
        <svg
          className={this.getClassNames()}
          viewBox="0 0 100 1">
          <path
            className="linear-progress-bar-trail"
            d={pathDescription}
            strokeWidth={this.props.strokeWidth}
            fillOpacity={0}/>
          <path
            className="linear-progress-bar-path"
            d={pathDescription}
            strokeWidth={this.props.strokeWidth}
            fillOpacity={0}
            style={progressStyle}/>
        </svg>
      </div>
    );
  }
}

LinearProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  initialAnimation: PropTypes.bool,
  classForPercentage: PropTypes.func,
  textForPercentage: PropTypes.func,
};

LinearProgressBar.defaultProps = {
  strokeWidth: 8,
  textForPercentage: (percentage) => `${percentage}%`,
  initialAnimation: false,
  classForPercentage: (percentage) => {
    if (percentage > 80) return "high";
    if (percentage > 95) return "critical";
    return "low";
  }
};

export default LinearProgressBar;
