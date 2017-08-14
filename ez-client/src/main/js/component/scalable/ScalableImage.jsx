import React from "react";

class ScalableImage extends React.Component {

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
      <div className="scalable-image" style={wrapperStyle}>
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

export default ScalableImage;

