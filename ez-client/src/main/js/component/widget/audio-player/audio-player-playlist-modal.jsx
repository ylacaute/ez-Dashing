import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import {Modal, ModalType} from 'component/modal';
import {WidgetEventCreator} from 'redux/event/widget-event';
import {ModalEventCreator} from 'redux/event/modal-event';
import FileBrowser from "react-keyed-file-browser";
import Moment from "moment";
import {Icon} from 'component/ui'
import 'react-keyed-file-browser/dist/react-keyed-file-browser.css';
import Logger from 'utils/logger';

import "./audio-player-playlist-modal.scss";

const logger = Logger.getLogger("AudioPlayerPlaylistModal");

class AudioPlayerPlaylistModal extends Modal {

  static propTypes = Object.assign({
    widgetId: PropTypes.string.isRequired,
  }, Modal.propTypes);

  static defaultProps = {
    modalType: ModalType.OkCancel,
    title: "Select files"
  };

  constructor(props) {
    super(props);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      files: [
        {
          key: 'test/',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'photos/',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'photos/animals/',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'photos/animals/cat in a hat.png',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'photos/animals/kitten_ball.png',
          modified: +Moment().subtract(3, 'days'),
          size: 545 * 1024,
        },
        {
          key: 'photos/animals/elephants.png',
          modified: +Moment().subtract(3, 'days'),
          size: 52 * 1024,
        },
        {
          key: 'photos/funny fall.gif',
          modified: +Moment().subtract(2, 'months'),
          size: 13.2 * 1024 * 1024,
        },
        {
          key: 'photos/holiday.jpg',
          modified: +Moment().subtract(25, 'days'),
          size: 85 * 1024,
        },
        {
          key: 'documents/',
          modified: +Moment().subtract(1, 'hours'),
          size: 1.5 * 1024 * 1024,
        },
        {
          key: 'documents/letter chunks.doc',
          modified: +Moment().subtract(15, 'days'),
          size: 480 * 1024,
        },
        {
          key: 'documents/export.pdf',
          modified: +Moment().subtract(15, 'days'),
          size: 4.2 * 1024 * 1024,
        },
      ]
    };
  }

  handleFileSelected(event) {
    logger.trace("handleFileSelected, event:", event);
    event.preventDefault();

    if (!event.target || !event.target.files || !event.target.files.length) {
      return null;
    }
    const fileList = [...event.target.files];
    logger.trace("handleFileSelected, fileList ", fileList);

    let blob = window.URL || window.webkitURL;

    const mappedFileList = fileList.map(file => ({
      file: file,
      fileURL: blob.createObjectURL(file),
      key: file.name,
      modified: file.lastModified,
      size: file.size
    }));

    logger.trace("handleFileSelected, mappedFileList ", mappedFileList);

    this.setState(state => ({
      ...state,
      files: [
        ...mappedFileList
      ]
    }));

  }

  handleDeleteFile(event) {
    console.log("delete file: ", event);
  }

  onCancel() {
    this.props.modalEvents.hideModal();
  }

  onOk() {
    let formData = new FormData(document.getElementById("textWidgetEditForm"));
    this.props.widgetEvents.updateWidgetConfig(this.props.widgetId, {
      text: formData.get('widgetText'),
      textType: formData.get('widgetTextType'),
    });
  }

  renderDetails(event) {
    logger.trace("renderDetails, event:", event);
    return (
      <div>File selected : {event.file && event.file.name}</div>
    );
  }

  handleSelect(file) {
    logger.trace("SELECT ", file);
  }

  handleSelectFile(file) {
    logger.trace("SELECT FILE ", file);
  }

  handleSelectFolder(file) {
    logger.trace("SELECT FOLDER ", file);
  }


  renderContent() {
    return (
      <>
        <p>WORK IN PROGRESS (SERVER FILE BROWSING)</p>
        <FileBrowser
          files={this.state.files}
          icons={{
            File: <Icon name="file"/>,
            Image: <Icon name="image"/>,
            PDF: <Icon name="file-alt"/>,
            Folder: <Icon name="folder"/>,
            FolderOpen: <Icon name="folder-open"/>,
            Loading: <Icon name="spinner"/>,
            Delete: <Icon name="folder"/>,
            Rename: <Icon name="folder"/>,
          }}
          onSelect={this.handleSelect.bind(this)}
          onSelectFile={this.handleSelectFile.bind(this)}
          onSelectFolder={this.handleSelectFolder.bind(this)}
          detailRenderer={this.renderDetails}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.modal
  };
};

const mapDispatchToProps = dispatch => ({
  widgetEvents: bindActionCreators(WidgetEventCreator, dispatch),
  modalEvents: bindActionCreators(ModalEventCreator, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayerPlaylistModal);

