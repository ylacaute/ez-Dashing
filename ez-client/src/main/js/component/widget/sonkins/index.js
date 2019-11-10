import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import SonkinsWidget from "component/widget/sonkins/SonkinsWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(SonkinsWidget)

