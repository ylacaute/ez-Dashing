import React from "react";
import PropTypes from "prop-types";
import Widget from "component/widget/base/Widget";
import WidgetContent from "component/widget/base/WidgetContent";
import ScalableImage from "component/scalable/ScalableImage";
import cn from "classnames";

export default class ImageWidget extends React.Component {

  static propTypes = Object.assign({
    logoUrl: PropTypes.string
  }, Widget.propTypes);

  static defaultProps = {
    logoUrl: "img/tech/ezLogo_512.png"
  };

  render() {
    const className = cn(this.props.className, this.props.mood);

    return (
      <Widget {...this.props} className={className}>
        <WidgetContent>
          <ScalableImage src={this.props.logoUrl}/>
        </WidgetContent>
      </Widget>
    );
  }

}
