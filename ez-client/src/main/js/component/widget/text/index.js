import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import TextWidget from "component/widget/text/TextWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(TextWidget)

