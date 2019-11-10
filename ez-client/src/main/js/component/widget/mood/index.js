import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import MoodWidget from "component/widget/mood/MoodWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(MoodWidget)

