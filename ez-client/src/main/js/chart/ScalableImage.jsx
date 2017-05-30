import React from 'react';
import PropTypes from 'prop-types';

class ScalableImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      backgroundImage: 'url(' + this.props.url + ')',
    };
    return (
      <div className="scalable-image" style={style}/>
    );
  }
}

ScalableImage.propTypes = {
  url: PropTypes.string.isRequired
};

export default ScalableImage;
