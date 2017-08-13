import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';

class TeamWidget extends AbstractWidget {

  static propTypes = {
    logoUrl: PropTypes.string
  };

  static defaultProps = {
    logoUrl: '/img/logo.png'
  };

  renderContent() {
    return (
      <ScalableImage src={this.props.logoUrl}/>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};


export default connect(mapStateToProps)(TeamWidget)
