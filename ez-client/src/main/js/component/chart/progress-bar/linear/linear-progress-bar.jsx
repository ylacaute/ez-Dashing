import React from "react";
import PropTypes from "prop-types";

import "./linear-progress-bar.scss"

export default class LinearProgressBar extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    percent: PropTypes.number.isRequired
  };

  static defaultProps = {
    className: "",
    percent: 0
  };

  state = {
    percent: this.props.percent
  };

  componentDidMount() {
    this.updateState(this.props);
  };

  // componentWillReceiveProps(nextProps) {
  //   this.updateState(nextProps);
  // };

  updateState() {
    this.setState({
      percent: this.props.percent
    });
  };

  render() {
    let { percent } = this.state;
    percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
    const style = {
      width: `${percent}%`
    };
    return (
      <div className={"progress-bar linear trail " + this.props.className}>
        <div className="path" style={style}/>
        <div className="trail"/>
      </div>
    );
  }
}
