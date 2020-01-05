import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import ScalableImage from 'component/scalable/image';
import cn from "classnames";
import MoodWidgetEditModal from './mood-widget-edit-modal';
import Moods from './Moods';

import "./mood-widget.scss"

export default class MoodWidget extends React.PureComponent {

  static propTypes = Object.assign({
    mood: PropTypes.oneOf(Moods),
  }, Widget.propTypes);

  static defaultProps = {
    mood: "good",
  };

  getEditModal() {
    const { id, mood } = this.props;
    return <MoodWidgetEditModal widgetId={id} mood={mood}/>;
  }

  render() {
    const className = cn(this.props.className, this.props.mood);

    return (
      <Widget {...this.props}
              className={className}
              editModal={this.getEditModal.bind(this)}>
        <WidgetContent>
          <ScalableImage className="icon"/>
        </WidgetContent>
      </Widget>
    );
  }

}
