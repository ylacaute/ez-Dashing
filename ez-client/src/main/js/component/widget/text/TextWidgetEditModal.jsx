import { connect } from "react-redux";
import { bindActionCreators  } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalType } from 'component/modal/Modal.jsx';
import { WidgetEventCreator } from 'redux/event/WidgetEvent';
import { ModalEventCreator } from 'redux/event/ModalEvent';

class TextWidgetEditModal extends Modal {

  static propTypes = {
    widgetId: PropTypes.string.isRequired,
    textType: PropTypes.oneOf(["none", "good", "info", "warn", "danger"]),
    text: PropTypes.string,
    onError: PropTypes.bool,
    visible: PropTypes.bool
  };

  static defaultProps = {
    textType: "none",
    text: "",
    onError: false,
    visible: false,
    modalType: ModalType.OkCancel,
    title: "TextWidget edit"
  };

  onCancel() {
    this.props.modalEvents.hideModal();
  }

  onOk() {
    let formData = new FormData(document.getElementById("textWidgetEditForm"));
    this.props.widgetEvents.updateConfig(this.props.widgetId, {
      text: formData.get('widgetText'),
      textType: formData.get('widgetTextType'),
    });
  }

  generateSelectOptions(initialValue) {
    let result = [];
    let options = [
      { value: 'none', label: 'None' },
      { value: 'good', label: 'Good' },
      { value: 'info', label: 'Info' },
      { value: 'warn', label: 'Warn' },
      { value: 'danger', label: 'Danger' }
    ];
    options.forEach(opt => {
      result.push(
        <option value={opt.value} selected={initialValue == opt.value}>{opt.label}</option>
      );
    });
    return result;
  }

  renderContent() {
    return (
      <form id="textWidgetEditForm">
        <label htmlFor="widgetTextType">
          Type
        </label>
        <select key={`select_${this.props.widgetId}`} name="widgetTextType">
          {this.generateSelectOptions(this.props.textType)}
        </select>
        <label htmlFor="widgetText">
          Text
        </label>
        <input
          type="text"
          name="widgetText"
          key={this.props.widgetId}
          defaultValue={this.props.text}
          >
        </input>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.modal
  };
};

const mapDispatchToProps = dispatch => ({
  widgetEvents: bindActionCreators(WidgetEventCreator, dispatch),
  modalEvents: bindActionCreators(ModalEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextWidgetEditModal);

