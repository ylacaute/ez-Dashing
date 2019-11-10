import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import TextWidget from "component/widget/text/TextWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(TextWidget)

