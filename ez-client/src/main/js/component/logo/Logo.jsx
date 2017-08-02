import React from 'react';
import PropTypes from 'prop-types';

export const ActionType = {
  LogoClicked: 'LOGO_CLICKED'
};

export const LogoActionCreator = {
  onLogoClicked : (clickCount) => {
    return {
      type: ActionType.LogoClicked,
      clickCount: clickCount
    }
  }
};

export class Logo extends React.Component {

  static propTypes = {
    onLogoClicked: PropTypes.func.isRequired,
  };

  static clickCount = 0;

  constructor(props) {
      super(props);
  }

  render() {
      return (
          <img className="logo" width='200px' src={'img/logo.png'}
               onClick={() => this.props.onLogoClicked(++Logo.clickCount)}/>
      );
  }
}


