import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import HelloErrorWidget from "component/widget/sample/error/HelloErrorWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(HelloErrorWidget);
