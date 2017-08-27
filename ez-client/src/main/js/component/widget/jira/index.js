import { connect } from "react-redux";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import BugWidget from "component/widget/jira/BugWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(BugWidget)

