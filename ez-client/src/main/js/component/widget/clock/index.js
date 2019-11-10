import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import ClockWidget from "component/widget/clock/ClockWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(ClockWidget)

