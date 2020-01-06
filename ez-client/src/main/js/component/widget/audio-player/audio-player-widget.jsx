import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetHeader from "component/widget/base/widget-header";
import WidgetContent from "component/widget/base/widget-content";
import AudioPlayer from "component/audio/player";
import AudioPlayerPlaylistModal from './audio-player-playlist-modal';
import cn from "classnames";

import "./audio-player-widget.scss";

export default class AudioPlayerWidget extends React.PureComponent {

  static propTypes = {
    /**
     * Common widget properties
     */
    ...Widget.propTypes,
    /**
     * This propery is not used yet. It will define which controls you want to display (play, stop, next...)
     */
    controls: PropTypes.array
  };

  static defaultProps = {
    title: "Audio Player"
  };

  getEditModal() {
    const {id, text, textType} = this.props;
    return <AudioPlayerPlaylistModal widgetId={id} text={text} textType={textType}/>;
  }

  render() {
    const {className, title} = this.props;
    const classNames = cn("audio-player", className);

    return (
      <Widget
        className={classNames}
        editModal={this.getEditModal.bind(this)}
        {...this.props}
      >
        <WidgetHeader title={title}/>
        <WidgetContent>
          <AudioPlayer />
        </WidgetContent>
      </Widget>
    )
  }

}
