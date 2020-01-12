import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/logger';
import cn from "classnames";
import AudioPlaylist from "./audio-playlist";
import AudioCControls from "./audio-controls";
import AudioVolume from "./audio-volume";
import InputRange from "component/range/input-range";
import MathUtils from "utils/math-utils";

import "./audio-player.scss";

const logger = Logger.getLogger("AudioPlayer");

const addHeadingZero = num => (num > 9 ? num.toString() : `0${num}`);

class AudioPlayer extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {};

  state = {
    playing: false,
    playingSrc: '',
    playingIndex: 0,
    onPause: false,
    files: [],
    currentTime: 0,
    volume: 10,
    volumeBeforeMute: 0,
    duration: 0,
    progressValue: 5,
    options: {
      repeat: false,
      random: false,
      playlistHidden: false,
      muted: false
    }
  };

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.audio = React.createRef();

    // Input file
    this.handleAddFilesClick = this.handleAddFilesClick.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);

    // Controls
    this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleClearAllClick = this.handleClearAllClick.bind(this);
    this.handleRepeatClick = this.handleRepeatClick.bind(this);
    this.handleRandomClick = this.handleRandomClick.bind(this);
    this.handleShowPlaylistClick = this.handleShowPlaylistClick.bind(this);
    this.handleMuteSoundClick = this.handleMuteSoundClick.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);

    // Input range
    this.handleInputRangeStartDrag = this.handleInputRangeStartDrag.bind(this);
    this.handleInputRangeEndDrag = this.handleInputRangeEndDrag.bind(this);
    this.handleInputRangeChange = this.handleInputRangeChange.bind(this);

    // Playlist
    this.handleItemDoubleClick = this.handleItemDoubleClick.bind(this);

    // Audio
    this.handleAudioEnded = this.handleAudioEnded.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      className: cn("audio-player", props.className),
    };
  }

  getAudioRef() {
    return this.audio.current;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.playing) {
        this.updateDisplayTime();
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  componentDidUpdate() {
    const audio = this.getAudioRef();
    if (audio.paused) {
      if (this.state.playing && !this.state.dragging) {
        audio.currentTime = this.state.currentTime;
        audio.play();
        audio.volume = this.state.volume / 100;
      }
    } else {
      if (!this.state.playing || this.state.dragging) {
        audio.currentTime = this.state.currentTime;
        audio.pause();
      }
    }
  }

  getPrevFileIndex() {
    const {playingIndex, files, options} = this.state;
    if (options.random) {
      return MathUtils.randomInt(files.length);
    }
    return options.repeat && playingIndex === 0
      ? files.length - 1
      : playingIndex - 1;
  }

  getNextFileIndex() {
    const {playingIndex, files, options} = this.state;
    if (options.random) {
      return MathUtils.randomInt(files.length);
    }
    return options.repeat && playingIndex >= files.length - 1
      ? 0
      : playingIndex + 1;
  }

  hasPrevFileIndex() {
    const {playingIndex, options} = this.state;
    return options.repeat || options.random || playingIndex > 0;
  }

  hasNextFileIndex() {
    const {playingIndex, files, options} = this.state;
    return options.repeat || options.random || playingIndex < files.length - 1;
  }

  play(playingIndex) {
    const {files} = this.state;
    if (files.length > 0 && playingIndex >= 0 && playingIndex < files.length) {
      this.setState({
        playing: true,
        playingSrc: URL.createObjectURL(files[playingIndex].file),
        onPause: false,
        playingIndex: playingIndex,
        currentTime: 0,
        duration: 0,
      });
    }
  }

  pause() {
    this.setState({
      playing: false,
      onPause: true
    });
  }

  unPause() {
    this.setState({
      playing: true,
      onPause: false
    });
  }

  stop() {
    this.setState({
      playing: false,
      onPause: false,
      currentTime: 0,
      duration: 0,
    });
  }

  formatTime(timeInSeconds) {
    if (timeInSeconds === 0 || isNaN(timeInSeconds)) {
      return "--:--"
    }
    const currentTimeMin = addHeadingZero(Math.floor(timeInSeconds / 60));
    const currentTimeSec = addHeadingZero(Math.floor(timeInSeconds % 60));
    return `${currentTimeMin}:${currentTimeSec}`
  }

  handlePrevClick() {
    if (this.hasPrevFileIndex()) {
      this.play(this.getPrevFileIndex());
    }
  }

  handleNextClick() {
    if (this.hasNextFileIndex()) {
      this.play(this.getNextFileIndex());
    }
  }

  handleAudioEnded() {
    if (this.hasNextFileIndex()) {
      this.play(this.getNextFileIndex());
    } else {
      this.stop();
    }
  }

  handleItemDoubleClick(idxClicked) {
    this.play(idxClicked);
  }

  updateDisplayTime() {
    if (!this.state.dragging) {
      const audio = this.getAudioRef();
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      this.setState({
        currentTime,
        duration,
      })
    }
  };

  handlePlayPauseClick() {
    if (this.state.playing) {
      this.pause();
    } else if (this.state.onPause) {
      this.unPause();
    } else {
      this.play(this.state.playingIndex);
    }
  }

  handleStopClick() {
    this.stop();
  }

  handleAddFilesClick() {
    this.fileInput.current.click();
  }

  handleClearAllClick() {
    this.setState({
      playing: false,
      files: [],
      currentTime: 0,
      duration: 0,
      playingIndex: 0
    });
  }

  handleRepeatClick() {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        repeat: !prevState.options.repeat
      }
    }));
  }

  handleRandomClick() {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        random: !prevState.options.random
      }
    }));
  }

  handleShowPlaylistClick() {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        playlistHidden: !prevState.options.playlistHidden
      }
    }));
  }

  handleVolumeChange(value) {
    const audio = this.getAudioRef();
    audio.volume = parseFloat(value) / 100;
    this.setState({
      volume: parseInt(value)
    });
  }

  handleMuteSoundClick() {
    const audio = this.getAudioRef();
    this.setState((prevState) => {
      let newMuted = !prevState.options.muted;
      let newVolume = 0;
      let newVolumeBeforeMute = 0;

      if (newMuted) {
        newVolumeBeforeMute = prevState.volume;
      } else {
        newVolume = prevState.volumeBeforeMute;
      }
      audio.volume = newVolume / 100;
      return {
        options: {
          ...prevState.options,
          muted: newMuted
        },
        volume: newVolume,
        volumeBeforeMute: newVolumeBeforeMute
      };
    });
  }

  handleInputFileChange(event) {
    event.preventDefault();
    if (!event.target || !event.target.files || !event.target.files.length) {
      return null;
    }
    const fileList = [...event.target.files];
    const mappedFileList = fileList.map(file => ({
      name: file.name,
      modified: file.lastModified,
      size: file.size,
      file: file
    }));
    this.setState(state => ({
      ...state,
      files: [
        ...state.files,
        ...mappedFileList
      ]
    }));
    this.fileInput.current.value = "";
  }

  handleInputRangeStartDrag() {
    this.setState({
      dragging: true,
    })
  }

  handleInputRangeEndDrag() {
    this.setState({
      dragging: false,
    })
  }

  handleInputRangeChange(value) {
    this.setState({
      progressValue: parseInt(value),
      currentTime: parseInt(value)
    })
  }

  render() {
    const {files, playing, playingSrc, playingIndex, currentTime, duration, volume, options} = this.state;
    const {className} = this.state;
    const formattedTime = this.formatTime(currentTime);
    const formattedDuration = this.formatTime(duration);
    const progressMaxValue = isNaN(duration) || duration === 0 ? 1 : duration;
    const rangeDisabled = files.length === 0;

    return (
      <div className={className}>
        <audio
          src={playingSrc}
          ref={this.audio}
          volume={volume}
          onEnded={this.handleAudioEnded}
        />
        <input
          type="file" multiple
          ref={this.fileInput}
          onChange={(e) => this.handleInputFileChange(e)}
        />
        <div className="player-info">
          <span className="current-time">{formattedTime}</span>
          <InputRange
            disabled={rangeDisabled}
            className="audio-track"
            value={currentTime}
            minValue={0}
            maxValue={progressMaxValue}
            onStartDrag={this.handleInputRangeStartDrag}
            onEndDrag={this.handleInputRangeEndDrag}
            onChange={this.handleInputRangeChange}
          />
          <span className="total-time">{formattedDuration}</span>
        </div>
        <AudioCControls
          displayLabels={false}
          controls={[{
            className: "play-pause",
            iconName: playing ? "pause" : "play",
            onClick: this.handlePlayPauseClick
          }, {
            className: "step-backward",
            iconName: "step-backward",
            onClick: this.handlePrevClick
          }, {
            className: "stop",
            iconName: "stop",
            onClick: this.handleStopClick
          }, {
            className: "step-forward",
            iconName: "step-forward",
            onClick: this.handleNextClick
          }, {
            className: "add-files",
            iconName: "plus-square",
            onClick: this.handleAddFilesClick
          }, {
            className: "remove-files",
            iconName: "trash-alt",
            onClick: this.handleClearAllClick
          }, {
            className: "repeat",
            iconName: "retweet",
            onClick: this.handleRepeatClick,
            active: options.repeat
          }, {
            className: "random",
            iconName: "random",
            onClick: this.handleRandomClick,
            active: options.random
          }, {
            className: "disp-playlist",
            iconName: "list",
            onClick: this.handleShowPlaylistClick,
            active: options.playlistHidden
          }, {
            className: "sound",
            iconName: options.muted ? "volume-mute" : "volume-up",
            onClick: this.handleMuteSoundClick
          }]}
        >
          <AudioVolume
            volume={volume}
            muted={options.muted}
            handleChange={this.handleVolumeChange}
          />
        </AudioCControls>
        <AudioPlaylist
          className="audio-playlist"
          hidden={options.playlistHidden}
          files={files}
          selectedIndex={playingIndex}
          handleItemDoubleClick={this.handleItemDoubleClick}/>
      </div>
    )
  }

}

export default AudioPlayer;
