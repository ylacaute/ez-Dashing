import React from "react";
import PropTypes from 'prop-types';

export default class ScalableImage extends React.Component {

  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ""
  };

  render() {
    let wrapperStyle = {
      display: "flex",
      flexGrow: 1,
      height: "100%",
    };
    let imgStyle =  {
      width: "100%",
      objectFit: "contain"
    };
    return (
      <div className={`scalable-image ${this.props.className}`} style={wrapperStyle}>
        <img
          style={imgStyle}
          draggable="false"
          src={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }

}
