import React from "react";
import PropTypes from 'prop-types';
import Rodal from 'rodal';
import Logger from 'utils/Logger';

const logger = Logger.getLogger("Modal");

const ModalType = {
  Ok: "OK_TYPE",
  OkCancel: "OK_CANCEL_TYPE"
};

class Modal extends React.Component {

  static propTypes = {
    content: PropTypes.node,
    visible: PropTypes.bool,
    title: PropTypes.node,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    errorMessage: PropTypes.string,
    modalType: PropTypes.PropTypes.oneOf([ModalType.Ok, ModalType.OkCancel])
  };

  static defaultProps = {
    content: null,
    visible: false,
    title: null,
    onOk: null,
    onCancel: null,
    errorMessage: "",
    modalType: ModalType.onOk
  };

  renderErrorMessage() {
    if (this.props.onError != true) {
      return null;
    }
    return <p className="message error">{this.props.errorMessage}</p>;
  }

  onCancel(event) {
  }

  onOk(event) {
  }

  renderFooter() {
    let okBtn = <button onClick={this.onOk.bind(this)} type="submit">OK</button>;
    let cancelBtn = null;

    switch (this.props.modalType) {
      case ModalType.OkCancel:
        cancelBtn = <button onClick={this.onCancel.bind(this)}>CANCEL</button>;
    }
    return (
      <div>
        {okBtn}
        {cancelBtn}
      </div>
    )
  }

  renderContent() {
    logger.warn("You display a modal window without content: you must override renderContent() function.");
  }

  render() {
    return (
      <div>
        <Rodal
            showCloseButton={false}
            visible={this.props.visible}
            onClose={this.onCancel.bind(this)}>
          <header>
            {this.props.title}
          </header>
          <article>
            {this.renderErrorMessage()}
            {this.renderContent()}
          </article>
          <footer>
            {this.renderFooter()}
          </footer>
        </Rodal>
      </div>
    );
  }
}

export {
  ModalType,
  Modal
}
