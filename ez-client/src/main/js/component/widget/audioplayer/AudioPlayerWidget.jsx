import React from 'react';
import Widget from "component/widget/base/Widget";
import WidgetHeader from "component/widget/base/WidgetHeader";
import WidgetContent from "component/widget/base/WidgetContent";
import AudioPlayer from "component/audio/player";

import AudioPlayerPlaylistModal from './AudioPlayerPlaylistModal';
import './AudioPlayerWidget.scss'

export default class AudioPlayerWidget extends React.Component {

  static propTypes = Object.assign({
  }, Widget.propTypes);

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  getEditModal() {
    const { id, text, textType } = this.props;
    return <AudioPlayerPlaylistModal widgetId={id} text={text} textType={textType}/>;
  }

  render() {
    const { title } = this.props;
    return (
      <Widget {...this.props} editModal={this.getEditModal.bind(this)}>
        <WidgetHeader title={title} />
        <WidgetContent>
          <AudioPlayer className="widget-audio-player" />
        </WidgetContent>
      </Widget>
    )
  }

}
