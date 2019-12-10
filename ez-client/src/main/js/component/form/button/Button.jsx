import React from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
import Icon from 'component/icon'

const Button = (
  {
    className,
    label,
    iconName,
    disabled,
    active,
    onClick,
    displayLabels
  }) => (
  <button
    className={cn("button", className, {active}, {disabled})}
    onMouseDown={(e) => e.stopPropagation()}
    onClick={onClick}
  >
    <Icon name={iconName}/>
    { displayLabels &&
      <span>{label}</span>
    }
  </button>
);
