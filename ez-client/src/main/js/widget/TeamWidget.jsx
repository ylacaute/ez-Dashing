import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import ScalableImage from 'js/chart/ScalableImage.jsx';

class TeamWidget extends React.Component {

  render() {
    return (
      <Widget
        className="team"
        title={this.props.displayName}
        content={
          <ScalableImage url={this.props.logoUrl} />
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

