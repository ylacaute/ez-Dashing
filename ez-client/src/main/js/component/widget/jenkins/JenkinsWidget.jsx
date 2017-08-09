import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from 'component/widget/base/Widget.jsx';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';


class JenkinsWidget extends AbstractWidget {

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

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(
  mapStateToProps
)(JenkinsWidget)

