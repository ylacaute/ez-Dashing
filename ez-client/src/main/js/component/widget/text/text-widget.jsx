import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import ScalableImage from 'component/scalable/image';
import TextWidgetEditModal from './text-widget-edit-modal';
import cn from "classnames";

import "./text-widget.scss";

export default class TextWidget extends React.PureComponent {

  static propTypes = Object.assign({
    text: PropTypes.string,
    textType: PropTypes.oneOf(["none", "good", "info", "warn", "danger"]),
    iconUrl: PropTypes.string
  }, Widget.propTypes);

  static defaultProps = {
    text: "",
    textType: "none",
    iconUrl: null
  };

  getEditModal() {
    const {id, text, textType} = this.props;
    return <TextWidgetEditModal widgetId={id} text={text} textType={textType}/>;
  }

  render() {
    const {className, textType} = this.props;
    const classNames = cn("text", className);

    return (
      <Widget
        className={classNames}
        editModal={this.getEditModal.bind(this)}
        {...this.props}
      >
        <WidgetContent>
          <div className={this.props.textType}>
            {textType !== "none" &&
            <ScalableImage className="text-icon"/>
            }
            <p>{this.props.text}</p>
          </div>
        </WidgetContent>
      </Widget>
    )
  }

}
