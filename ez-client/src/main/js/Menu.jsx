import React from 'react';
import PropTypes from 'prop-types';
import { slide as BurgerMenu } from 'react-burger-menu';

class Menu extends React.Component {

  static propTypes = {
    resetLayout: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  };

  resetLayout(event) {
    event.preventDefault();
    this.props.resetLayout();
  }

  render() {
    return (
      <BurgerMenu>
        <h1>
          <i className="ez-logo"></i>
          <span>ez-Dashing</span>
        </h1>
        <a onClick={this.resetLayout.bind(this)} className="menu-item" href="/">Reset layout</a>
      </BurgerMenu>
    );
  }
}

export default Menu;
