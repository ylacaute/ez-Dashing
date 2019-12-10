import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import AudioPlayerWidget from "component/widget/audio/AudioPlayerWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(AudioPlayerWidget);
