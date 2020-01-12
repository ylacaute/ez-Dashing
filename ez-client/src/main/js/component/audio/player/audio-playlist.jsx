import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/logger';
import cn from "classnames";
import {Icon} from 'component/ui'

import "./audio-playlist.scss";

const logger = Logger.getLogger("AudioPlaylist");

const PlaylistItem = ({name, selected, idx, handleItemDoubleClick}) => (
  <div className={cn("playlist-item", {'selected': selected})}
       onDoubleClick={() => handleItemDoubleClick(idx)}>
    <Icon name="file"/>
    <span>{name}</span>
  </div>
);

class AudioPlaylist extends React.PureComponent {

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
    classname: ""
  };

  static getDerivedStateFromProps(props) {
    return {
      className: cn("audio-playlist", props.className, props.hidden),
    };
  }

  render() {
    const {files, selectedIndex, handleItemDoubleClick} = this.props;
    const {className} = this.state;

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
      <div className={className}>
        {items}
      </div>
    )
  }
}

export default AudioPlaylist;
