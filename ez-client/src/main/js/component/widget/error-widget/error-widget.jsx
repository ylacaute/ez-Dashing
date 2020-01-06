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
    error: PropTypes.any,
    errorInfo: PropTypes.any
  };

  static defaultProps = {
    error: null,
    errorInfo: null
  };

  render() {
    const {className, id, title, error, errorInfo} = this.props;
    const classNames = cn("error", className);
    const displayedTitle = title ? title : "Error widget";

    return (
      <Widget
        className={classNames}
        editable={false}
        {...this.props}
      >
        <WidgetHeader title={displayedTitle}/>
        <WidgetContent>
          <details style={{whiteSpace: 'pre-wrap'}}>
            <summary>
              The widgetId <strong>{id}</strong> has generated an error and can't be displayed.
              Please read the error details below.
            </summary>
            <br/>
            {error && error.toString()}
            <br/>
            {errorInfo.componentStack}
          </details>
        </WidgetContent>
      </Widget>
    )
  }
}
