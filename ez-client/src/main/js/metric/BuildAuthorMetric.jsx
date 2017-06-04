import React from 'react';
import PropTypes from 'prop-types';

import ScalableImage from 'js/core/ScalableImage.jsx'
import AvatarConfig from 'js/config/AvatarConfig.jsx'

class BuildAuthorMetric extends React.Component {

  render() {
    let avatar = AvatarConfig.get(this.props.jenkinsAuthor, this.props.avatars);
    return (
      <div className="metric build-author">
        <ScalableImage imgUrl={avatar.url} />
      </div>
    );
  }

}

BuildAuthorMetric.propTypes = {
  avatars: PropTypes.array,
  jenkinsAuthor: PropTypes.string
};

export default BuildAuthorMetric;
