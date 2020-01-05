import React from "react";
import ErrorWidget from "component/widget/error-widget";
import PropTypes from "prop-types";

export default class WidgetErrorBoundary extends React.PureComponent {

  static propTypes = {
    widgetConfiguration: PropTypes.object,
  };

  static defaultProps = {
    widgetProps: {},
  };

  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("An error has occurred: ", error, errorInfo);
  }

  render() {
    const {errorInfo} = this.state;
    const {widgetConfiguration} = this.props;

    if (errorInfo) {
      return <ErrorWidget {...widgetConfiguration} {...this.state}/>
    }
    return this.props.children;
  }
}

