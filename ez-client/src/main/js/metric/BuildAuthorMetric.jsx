import React from 'react';
import PropTypes from 'prop-types';

import ScalableImage from 'core/ScalableImage.jsx';
import ScalableText from 'core/ScalableText.jsx';
import AvatarConfig from 'config/AvatarConfig';

class BuildAuthorMetric extends React.Component {

  render() {
    let avatar = AvatarConfig.get(this.props.jenkinsAuthor, this.props.avatars);
    return (
      <div className="metric build-author">
        <ScalableImage imgUrl={avatar.url} />
        <div className="info">
          <ScalableText text="Last build" textAnchor="middle"/>
          <ScalableText text={avatar.displayName} textAnchor="middle"/>
        </div>
      </div>
    );
  }

}

BuildAuthorMetric.propTypes = {
  avatars: PropTypes.array,
  jenkinsAuthor: PropTypes.string
};

export default BuildAuthorMetric;
