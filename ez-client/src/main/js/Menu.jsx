import React from 'react';
import PropTypes from 'prop-types';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  static propTypes = {
    resetLayout: PropTypes.func.isRequired,
    resetTheme: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  };

  resetLayout(event) {
    event.preventDefault();
    this.props.resetLayout();
  }

  resetTheme(event) {
    event.preventDefault();
    this.props.resetTheme();
  }

  changeTheme(event, themeName) {
    event.preventDefault();
    this.props.changeTheme(themeName);
  }

  render() {
    return (
      <BurgerMenu>
        <h1>
          <i className="logo-icon"></i>
          <span>ez-Dashing</span>
        </h1>
        <a className="menu-item" onClick={this.resetLayout.bind(this)} href="#">
          <i className="layout-icon"/>
          <span>Reset layout</span>
        </a>
        <a className="menu-item" onClick={this.resetTheme.bind(this)} href="#">
          <i className="theme-icon"/>
          <span>Reset theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme(e, "black")} href="#">
          <i className="theme-icon"/>
          <span>Set black Theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme(e, "default")} href="#">
          <i className="theme-icon"/>
          <span>Set default Theme</span>
        </a>
      </BurgerMenu>
    );
  }
}

export default Menu;
