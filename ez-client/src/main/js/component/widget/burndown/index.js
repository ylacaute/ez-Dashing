import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import BurndownChartWidget from "component/widget/burndown/BurndownChartWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(BurndownChartWidget);
