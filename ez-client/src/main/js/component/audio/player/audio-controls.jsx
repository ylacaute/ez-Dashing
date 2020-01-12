import React from 'react';
import PropTypes from 'prop-types';
import Logger from 'utils/logger';
import cn from "classnames";
import {Icon} from 'component/ui';

import "./audio-controls.scss";

const logger = Logger.getLogger("AudioControls");

const AudioButton = ({label, iconName, className, active, onClick, displayLabels}) => (
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

class AudioControls extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string,
    controls: PropTypes.array,
    children: PropTypes.node
  };

  static defaultProps = {
    controls: []
  };

  state = {
    className: "",
    items: []
  };

  static getDerivedStateFromProps(props) {
    return {
      className: cn("audio-controls", props.className),
      items: props.controls.map((item, idx) => <AudioButton key={idx} {...item} />)
    };
  }

  render() {
    const {children} = this.props;
    const {className, items} = this.state;

    return (
      <div className={className}>
        {items}
        {children}
      </div>
    )
  }
}

export default AudioControls;
