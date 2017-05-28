import React from 'react';
import LinearProgressBar from 'js/chart/LinearProgressBar.jsx';

class LinearMetricBar extends React.Component {

  constructor(props) {
    super(props);
  }

  getClassNames() {
    let className = "linear-metric-bar " + this.props.styleName + " ";
    if (this.props.classForPercentage) {
      className += this.props.classForPercentage(this.props.percentage);
    }
    return className;
  }

  render() {
    return (
      <div className={this.getClassNames()}>
        <label className="metric-label">{this.props.label}</label>
        <label className="metric-value">{this.props.displayValue ? this.props.displayValue : this.props.percentage + ' %'}</label>
        <LinearProgressBar
          styleName={this.props.styleName}
          percentage={this.props.percentage}
          classForPercentage={this.props.classForPercentage}/>
      </div>
    );
  }
}


export default LinearMetricBar;
