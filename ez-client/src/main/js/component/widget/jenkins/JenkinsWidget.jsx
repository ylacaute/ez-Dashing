import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";


export default class JenkinsWidget extends AbstractWidget {

  static propTypes = {
  };

  static defaultProps = {
  };

  renderContent() {
    return (
      <div className="layout-test">
        <span>AAA</span>
        <span>BBB</span>
        <span>CCC</span>
        <span>DDD</span>
      </div>
    )
  }

}
