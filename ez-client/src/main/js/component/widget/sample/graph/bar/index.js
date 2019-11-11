import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import HelloGraphBarWidget from "component/widget/sample/graph/bar/HelloGraphBarWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(HelloGraphBarWidget);

