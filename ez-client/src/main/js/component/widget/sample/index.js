import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import ErrorWidget from "component/widget/sample/ErrorWidget.jsx";
import HelloWorldWidget from "component/widget/sample/HelloWorldWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

module.exports = {
  ErrorWidget: connect(mapStateToProps)(ErrorWidget),
  HelloWorldWidget: connect(mapStateToProps)(HelloWorldWidget)
};
