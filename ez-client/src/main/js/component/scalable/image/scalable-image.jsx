import React from "react";
import PropTypes from 'prop-types';

import "./scalable-image.scss";

export default class ScalableImage extends React.Component {

  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
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

  render() {
    let imgStyle = !this.props.src ? {} : {
      backgroundImage: `url(${this.props.src})`
    };
    return (
      <div className="scalable-image-wrapper" >
        <div
          className={this.props.className}
          style={imgStyle}
        />
      </div>
    );
  }
}
