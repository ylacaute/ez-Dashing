import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';

class TeamWidget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundImage: 'url(' + this.props.logoUrl + ')',
    };
    return (
      <Widget
        className="team"
        title={this.props.displayName}
        content={
          <div className="logo" style={style}/>
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

