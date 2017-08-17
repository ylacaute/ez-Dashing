import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import HelloErrorWidget from "component/widget/sample/HelloErrorWidget.jsx";
import HelloWorldWidget from "component/widget/sample/HelloWorldWidget.jsx";
import HelloGraphWidget from "component/widget/sample/HelloGraphWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

module.exports = {
  HelloErrorWidget: connect(mapStateToProps)(HelloErrorWidget),
  HelloWorldWidget: connect(mapStateToProps)(HelloWorldWidget),
  HelloGraphWidget: connect(mapStateToProps)(HelloGraphWidget)
};
