import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';

export default class TeamWidget extends AbstractWidget {

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
