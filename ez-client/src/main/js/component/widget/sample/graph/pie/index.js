import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import HelloGraphPieWidget from "component/widget/sample/graph/pie/HelloGraphPieWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(HelloGraphPieWidget);

