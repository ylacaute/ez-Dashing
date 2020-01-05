import { connect } from "react-redux";
import { bindActionCreators  } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalType } from 'component/modal/modal';
import { WidgetEventCreator } from 'redux/event/widget-event';
import { ModalEventCreator } from 'redux/event/modal-event';
import Uuid from 'utils/uuid';
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
        <option key={Uuid.random()} value={opt}>
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
        <select key={Uuid.random()}
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

