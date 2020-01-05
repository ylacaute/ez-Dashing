import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetHeader from "component/widget/base/widget-header";
import WidgetContent from "component/widget/base/widget-content";

import "./error-widget.scss";

export default class ErrorWidget extends React.Component {

  static propTypes = {
    //...Widget.propTypes,
    error: PropTypes.any,
    errorInfo: PropTypes.any
  };

  static defaultProps = {
    error: null,
    errorInfo: null
  };

  render() {
    const {id, title, error, errorInfo} = this.props;

    const displayedTitle = title ? title : "Error widget";

    return (
      <Widget {...this.props} className="error" editable={false}>
        <WidgetHeader title={displayedTitle} />
        <WidgetContent>

          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>
              The widgetId <strong>{id}</strong> has generated an error and can't be displayed.
              Please read the error details below.
            </summary>
            <br/>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </WidgetContent>
      </Widget>
    )
  }

}
