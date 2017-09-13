import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import MoodWidgetEditModal from 'component/widget/mood/MoodWidgetEditModal.jsx';
import Moods from 'component/widget/mood/Moods';

export default class MoodWidget extends AbstractWidget {

  static propTypes = {
    mood: PropTypes.oneOf(Moods),
  };

  static defaultProps = {
    mood: "good"
  };

  getWidgetClassNames() {
    return super
      .getWidgetClassNames()
      .concat(this.props.mood);
  }

  getWidgetEditModal() {
    const { id, mood } = this.props;
    return <MoodWidgetEditModal widgetId={id} mood={mood}/>;
  }

  renderContent() {
    return (
      <ScalableImage className="icon"/>
    );
  }

}
