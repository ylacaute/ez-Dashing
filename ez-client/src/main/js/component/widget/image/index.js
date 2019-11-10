import { connect } from "react-redux";
import Widget from "component/widget/base/Widget.jsx";
import ImageWidget from "component/widget/image/ImageWidget.jsx";

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(ImageWidget)

