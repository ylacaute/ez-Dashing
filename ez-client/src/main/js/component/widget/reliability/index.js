import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import ReliabilityWidget from "component/widget/reliability/ReliabilityWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(ReliabilityWidget)

