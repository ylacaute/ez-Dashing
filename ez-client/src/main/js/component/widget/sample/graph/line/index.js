import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import HelloGraphLineWidget from "component/widget/sample/graph/line/HelloGraphLineWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(HelloGraphLineWidget);

