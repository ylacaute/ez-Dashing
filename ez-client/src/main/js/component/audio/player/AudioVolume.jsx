import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/Logger';
import './AudioVolume.scss';
import InputRange from "component/range/InputRange";
import cn from "classnames";

const logger = Logger.getLogger("AudioVolume");

class AudioVolume extends React.Component {

  static propTypes = {
    volume: PropTypes.number,
    handleChange: PropTypes.func
  };

  static defaultProps = {
    handleChange: () => {}
  };

  render() {
    const { volume, handleChange } = this.props;

    return (
      <div className="audio-volume">
        <InputRange
          value={volume}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={handleChange}
        />
      </div>
    )
  }
}

export default AudioVolume;
