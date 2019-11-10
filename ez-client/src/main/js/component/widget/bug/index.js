import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import BugWidget from "component/widget/bug/BugWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(BugWidget)

