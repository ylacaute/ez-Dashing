import React from "react";
import PropTypes from 'prop-types';

export default class ModalContainer extends React.Component {

  static propTypes = {
    modalComponent: PropTypes.node
  };

  static defaultProps = {
    modalComponent: null
  };

  render() {
    return (
      <div>
        {this.props.modalComponent}
      </div>
    );
  }
}
