import React from "react";
import PropTypes from 'prop-types';

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
  };

  imgBaseStyle = {
    width: "100%",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  };

  render() {
    let imgStyle = this.props.src == null ? this.imgBaseStyle : {
      ...this.imgBaseStyle,
      backgroundImage: `url(${this.props.src})`
    };
    return (
      <div className="scalable-image-wrapper" style={this.wrapperBaseStyle}>
        <div
          className={this.props.className}
          style={imgStyle}
        />
      </div>
    );
  }
}
