import React from 'react';
import Widget from "component/widget/base/Widget.jsx";
import WidgetHeader from "component/widget/base/WidgetHeader.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";
import AudioPlayerPlaylistModal from 'component/widget/audio/AudioPlayerPlaylistModal.jsx';
import AudioPlayer from "component/audio/player";

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
