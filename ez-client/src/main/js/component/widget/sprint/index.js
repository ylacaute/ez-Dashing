import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import SprintWidget from "component/widget/sprint/SprintWidget.jsx";
import BurndownChartWidget from "component/widget/sprint/BurndownChartWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

module.exports = {
  SprintWidget: connect(mapStateToProps)(SprintWidget),
  BurndownChartWidget: connect(mapStateToProps)(BurndownChartWidget)
};
