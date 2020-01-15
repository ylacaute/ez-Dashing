import React from "react";
import PropTypes from 'prop-types';
import cn from "classnames";

import "./scalable-image.scss";

export default class ScalableImage extends React.PureComponent {

  static ImageTypeClassName = {
    DEFAULT: "default",
    SVG: "svg"
  };

  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string
  };

  static defaultProps = {
    className: "",
    src: null
  };

  state = {
    imgStyle: {}
  };

  static getDerivedStateFromProps(props) {
    const {src} = props;
    let imageStyle = {};
    let imgTypeClassName;

    if (src) {
      if (src.endsWith(".svg")) {
        imgTypeClassName = ScalableImage.ImageTypeClassName.SVG;
        imageStyle = {
          WebkitMask: `url(${props.src}) no-repeat 50% 50%`,
        }
      } else {
        imgTypeClassName = ScalableImage.ImageTypeClassName.DEFAULT;
        imageStyle = {
          backgroundImage: `url(${props.src})`
        }
      }
    }

    return {
      className: cn("scalable-image-wrapper", imgTypeClassName, props.className),
      imgStyle: imageStyle
    }
  };

  render() {
    const {className, imgStyle} = this.state;

    return (
      <div className={className}>
        <div
          className="scalable-image"
          style={imgStyle}
        />
      </div>
    );
  }
}
