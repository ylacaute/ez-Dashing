import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/Logger';
import './AudioControls.scss';
import cn from "classnames";
import Icon from 'component/icon'

const logger = Logger.getLogger("AudioControls");

const AudioButton = ({ label, iconName, className, active, onClick, displayLabels }) => (
  <button
      className={cn("control-item", className, {active})}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={onClick}>
    <Icon name={iconName}/>
    {displayLabels &&
      <span>{label}</span>
    }
  </button>
);

class AudioControls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    controls: PropTypes.array,
    children: PropTypes.node
  };

  static defaultProps = {
    controls: []
  };

  render() {
    const { className, controls, children } = this.props;
    const classNames = cn("audio-controls", className);
    const items = controls.map((item, idx) => (
        <AudioButton key={idx} {...item} />
    ));
    return (
      <div className={classNames}>
        {items}
        {children}
      </div>
    )
  }
}

export default AudioControls;
