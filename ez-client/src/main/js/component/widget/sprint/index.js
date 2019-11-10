import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import SprintWidget from "component/widget/sprint/SprintWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(SprintWidget);
