import React from "react";
import PropTypes from 'prop-types';
import cn from "classnames";

import "./scalable-image.scss";

export default class ScalableImage extends React.PureComponent {

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

  wrapperBaseStyle = {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    width: "100%"
  };

  imgBaseStyle = {
    width: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  };

  static getDerivedStateFromProps(props) {
    return {
      className: cn(props.className),
      imgStyle: !props.src ? {} : {
        backgroundImage: `url(${props.src})`
      }
    }
  };

  render() {
    const {className, imgStyle} = this.state;

    return (
      <div className="scalable-image-wrapper">
        <div
          className={className}
          style={imgStyle}
        />
      </div>
    );
  }
}
