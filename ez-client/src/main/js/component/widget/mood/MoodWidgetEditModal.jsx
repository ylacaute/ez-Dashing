import { connect } from "react-redux";
import { bindActionCreators  } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalType } from 'component/modal/Modal.jsx';
import { WidgetEventCreator } from 'redux/event/WidgetEvent';
import { ModalEventCreator } from 'redux/event/ModalEvent';
import UUID from 'utils/UUID.js';
import Moods from 'component/widget/mood/Moods';

class MoodWidgetEditModal extends Modal {

  static propTypes = {
    widgetId: PropTypes.string.isRequired,
    mood: PropTypes.oneOf(Moods).isRequired
  };

  static defaultProps = {
    title: "MoodWidget edit"
  };

  onCancel() {
    this.props.modalEvents.hideModal();
  }

  onOk() {
    let formData = new FormData(document.getElementById("moodWidgetEditForm"));
    this.props.widgetEvents.updateWidgetConfig(this.props.widgetId, {
      mood: formData.get('widgetMood')
    });
  }

  generateSelectOptions() {
    let result = [];
    Moods.forEach(opt => {
      result.push(
        <option key={UUID.random()} value={opt}>
          {opt}
        </option>
      );
    });
    return result;
  }

  renderContent() {
    return (
      <form id="moodWidgetEditForm">
        <label htmlFor="widgetMood">
          Type
        </label>
        <select key={UUID.random()}
                name="widgetMood"
                defaultValue={this.props.mood}>
          {this.generateSelectOptions()}
        </select>
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
)(MoodWidgetEditModal);

