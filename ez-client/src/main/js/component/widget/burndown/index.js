import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import BurndownChartWidget from "component/widget/burndown/BurndownChartWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(BurndownChartWidget);
