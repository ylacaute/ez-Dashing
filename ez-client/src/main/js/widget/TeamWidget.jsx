import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'widget/base/Widget.jsx';
import ScalableImage from 'core/ScalableImage.jsx';
import RefreshableWidget from 'widget/base/RefreshableWidget.jsx';

class TeamWidget extends RefreshableWidget {

  render() {
    return (
      <Widget
        className="team"
        title={this.props.title}
        content={
          <ScalableImage imgUrl={this.props.logoUrl} />
        }
      />
    );
  }
}

TeamWidget.propTypes = {
  title: PropTypes.string,
  logoUrl: PropTypes.string
};

TeamWidget.defaultProps = {
  logoUrl: ''
};

export default TeamWidget;

