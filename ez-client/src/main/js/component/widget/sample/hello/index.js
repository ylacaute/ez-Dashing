import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import HelloWorldWidget from "component/widget/sample/hello/HelloWorldWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(HelloWorldWidget);
