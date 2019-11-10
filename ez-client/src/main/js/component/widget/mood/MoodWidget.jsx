import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/Widget.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import MoodWidgetEditModal from 'component/widget/mood/MoodWidgetEditModal.jsx';
import Moods from 'component/widget/mood/Moods';
import cn from "classnames";

export default class MoodWidget extends React.Component {

  static propTypes = Object.assign({
    mood: PropTypes.oneOf(Moods),
  }, Widget.propTypes);

  static defaultProps = {
    mood: "good",
  };

  createEditModal() {
    const { id, mood } = this.props;
    return <MoodWidgetEditModal widgetId={id} mood={mood}/>;
  }

  render() {
    const className = cn(this.props.className, this.props.mood);

    return (
      <Widget {...this.props}
              className={className}
              createEditModal={this.createEditModal.bind(this)}>
        <WidgetContent>
          <ScalableImage className="icon"/>
        </WidgetContent>
      </Widget>
    );
  }

}
