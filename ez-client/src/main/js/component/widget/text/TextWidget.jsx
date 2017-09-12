import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import TextWidgetEditModal from 'component/widget/text/TextWidgetEditModal.jsx';

export default class TextWidget extends AbstractWidget {

  static propTypes = {
    text: PropTypes.string,
    textType: PropTypes.oneOf(["none", "good", "info", "warn", "danger"]),
    iconUrl: PropTypes.string
  };

  static defaultProps = {
    text: "",
    textType: "none",
    iconUrl: null,
  };

  getWidgetEditModal() {
    const { id, text, textType } = this.props;
    return <TextWidgetEditModal widgetId={id} text={text} textType={textType}/>;
  }

  renderIcon() {
    return this.props.textType == "none" ? null : (
      <ScalableImage className="text-icon"/>
    );
  }

  renderContent() {
    return (
      <div className={this.props.textType}>
        {this.renderIcon()}
        <p>{this.props.text}</p>
      </div>
    );
  }

}
