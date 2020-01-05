import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/logger';
import cn from "classnames";
import {Icon} from 'component/ui'

import "./audio-playlist.scss";

const logger = Logger.getLogger("AudioPlaylist");

const PlaylistItem = ({name, selected, idx, handleItemDoubleClick}) => (
  <div className={cn("playlist-item", { 'selected': selected })}
       onDoubleClick={() => handleItemDoubleClick(idx)}>
    <Icon name="file"/>
    <span>{name}</span>
  </div>
);

class AudioPlaylist extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    hidden: PropTypes.bool,
    files: PropTypes.array,
    selectedIndex: PropTypes.number,
    handleItemDoubleClick: PropTypes.func
  };

  static defaultProps = {
    files: [],
    show: true,
    selectedIndex: -1
  };

  state = {
  };

  render() {
    const { className, files, selectedIndex, handleItemDoubleClick, hidden } = this.props;
    const classNames = cn("audio-playlist", className, {hidden});
    const items = files.map((item, idx) => (
        <PlaylistItem
          key={idx}
          selected={idx === selectedIndex}
          idx={idx}
          handleItemDoubleClick={handleItemDoubleClick}
          {...item}
        />
    ));

    return (
      <div className={classNames}>
        {items}
      </div>
    )
  }
}

export default AudioPlaylist;
