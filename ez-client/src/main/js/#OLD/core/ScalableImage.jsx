import React from 'react';
import PropTypes from 'prop-types';

import ScalableText from 'core/ScalableText.jsx'

class ScalableImage extends React.Component {

  render() {
    return (
      <div className="scalable-image">
        <img src={this.props.imgUrl} draggable="false" />
        { this.props.label != null &&
        <ScalableText
          className={`label ${this.props.labelClassName}`}
          textAnchor="middle"
          text={this.props.label}
          wViewPort={this.props.labelViewportWidth}/>
        }
      </div>
    );
  }
}

ScalableImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  jenkinsAuthor: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelViewportWidth: PropTypes.number
};

ScalableImage.defaultProps = {
  labelClassName: '',
  labelViewportWidth: 70
};

export default ScalableImage;
