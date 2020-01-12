import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetHeader from "component/widget/base/widget-header";
import WidgetContent from "component/widget/base/widget-content";
import cn from "classnames";

import "./error-widget.scss";

export default class ErrorWidget extends React.PureComponent {

  static propTypes = {
    //...Widget.propTypes, // FIXME: Why we can't do that ?
    classname: PropTypes.string,
    error: PropTypes.any,
    errorInfo: PropTypes.any
  };

  static defaultProps = {
    error: null,
    errorInfo: null
  };

  state = {
    classname: "",
    title: "",
    componentStack: ""
  };

  static getDerivedStateFromProps(props) {
    return {
      className: cn("error", props.className),
      title: props.title ? props.title : "Error widget",
      error: props.error ? props.error.toString : "Unknown error",
      componentStack: props.errorInfo
        ? props.errorInfo.componentStack
          ? props.errorInfo.componentStack
          : props.errorInfo
        : "no stack to display"
    };
  }

  render() {
    const {id, error} = this.props;
    const {title, componentStack} = this.state;

    return (
      <Widget
        editable={false}
        {...this.props}
        {...this.state}
      >
        <WidgetHeader title={title}/>
        <WidgetContent>
          <details style={{whiteSpace: 'pre-wrap'}}>
            <summary>
              The widgetId <strong>{id}</strong> has generated an error and can't be displayed.
              Please read the error details below.
            </summary>
            <br/>
            {error && error.toString()}
            <br/>
            {componentStack}
          </details>
        </WidgetContent>
      </Widget>
    )
  }
}
