import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import ScalableImage from 'js/core/ScalableImage.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';

class TeamWidget extends RefreshableWidget {

  render() {
    return (
      <Widget
        className="team"
        title={this.props.displayName}
        content={
          <ScalableImage imgUrl={this.props.logoUrl} />
        }
      />
    );
  }
}

TeamWidget.propTypes = {
  displayName: PropTypes.string,
  logoUrl: PropTypes.string
};

TeamWidget.defaultProps = {
  logoUrl: ''
};

export default TeamWidget;

