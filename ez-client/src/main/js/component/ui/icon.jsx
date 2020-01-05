import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faFile,
  faFileAlt,
  faFolder,
  faFolderOpen,
  faImage,
  faPlay,
  faPause,
  faStop,
  faStepBackward,
  faStepForward,
  faPlusSquare,
  faTrashAlt,
  faRetweet,
  faRandom,
  faList,
  faVolumeMute,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckSquare,
  faFile,
  faFileAlt,
  faFolder,
  faFolderOpen,
  faImage,
  faPlay,
  faPause,
  faStop,
  faStepBackward,
  faStepForward,
  faPlusSquare,
  faTrashAlt,
  faRetweet,
  faRandom,
  faList,
  faVolumeMute,
  faVolumeUp,
);

export const Icon = ({name, ...other}) => {
  return (
    <i className="icon">
      <FontAwesomeIcon icon={name} {...other}  />
    </i>
  )
};

