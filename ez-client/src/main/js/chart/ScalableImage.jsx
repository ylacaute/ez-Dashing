import React from 'react';
import PropTypes from 'prop-types';

class ScalableImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let style = {};
    if (this.props.url != null) {
      style.backgroundImage = 'url(' + this.props.url + ')';
    }
    return (
      <div className={`scalable-image icon ${this.props.className}`} style={style}/>
    );
  }
}

ScalableImage.propTypes = {
  url: PropTypes.string
};

export default ScalableImage;
