import React from "react";
import PropTypes from "prop-types";

import "./snow-effect.scss";

export default class SnowEffect extends React.PureComponent {

  static propTypes = {
  };

  static defaultProps = {
  };

  render() {
    return (
      <div className="snow-container">
        <div className="snow foreground" />
        <div className="snow foreground layered" />
        <div className="snow middleground" />
        <div className="snow middleground layered" />
        <div className="snow background" />
        <div className="snow background layered" />
      </div>
    );
  }

}
