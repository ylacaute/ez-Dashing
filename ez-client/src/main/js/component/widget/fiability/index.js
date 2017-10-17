import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import FiabilityWidget from "component/widget/fiability/FiabilityWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(FiabilityWidget)

