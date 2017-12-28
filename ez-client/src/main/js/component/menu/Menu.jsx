import React from 'react';
import PropTypes from 'prop-types';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  static propTypes = {
    resetLayout: PropTypes.func.isRequired,
    saveLayout: PropTypes.func.isRequired,
    resetTheme: PropTypes.func.isRequired,
    changeTheme: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  };

  resetLayout() {
    this.props.resetLayout();
  }

  saveLayout() {
    this.props.saveLayout();
  }

  resetTheme() {
    this.props.resetTheme();
  }

  changeTheme(themeName) {
    this.props.changeTheme(themeName);
  }

  resetLocalStorage() {
    localStorage.clear();
    location.reload(true);
  }

  render() {
    return (
      <BurgerMenu>
        <h1>
          <i className="logo-icon"></i>
          <span>ez-Dashing</span>
        </h1>
        <a className="menu-item" onClick={this.resetLayout.bind(this)}>
          <i className="layout-icon"/>
          <span>Reload layout from server</span>
        </a>
        <a className="menu-item" onClick={this.saveLayout.bind(this)}>
          <i className="layout-icon"/>
          <span>Save layout on server</span>
        </a>
        <a className="menu-item" onClick={this.resetTheme.bind(this)}>
          <i className="theme-icon"/>
          <span>Reset theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme("default")}>
          <i className="theme-icon"/>
          <span>Set Default Theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme("black")}>
          <i className="theme-icon"/>
          <span>Set Black Theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme("dashing")}>
          <i className="theme-icon"/>
          <span>Set Dashing Theme</span>
        </a>
        <a className="menu-item" onClick={(e) => this.changeTheme("snow")}>
          <i className="theme-icon"/>
          <span>Snow Theme</span>
        </a>
        <a className="menu-item" onClick={this.resetLocalStorage.bind(this)}>
          <i className="layout-icon"/>
          <span>Reload all (server config)</span>
        </a>
      </BurgerMenu>
    );
  }
}

export default Menu;
