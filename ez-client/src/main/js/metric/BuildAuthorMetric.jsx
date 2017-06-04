import React from 'react';
import PropTypes from 'prop-types';

import ScalableImage from 'js/core/ScalableImage.jsx'


const DEFAULT_AVATAR = {
  nick: 'ANONYMOUS',
  url: "/img/avatars/anonymous_01.png"
};


class BuildAuthor extends React.Component {

  render() {
    let avatars = this.props.avatars;
    let avatar;
    if (avatars != null) {
      avatar = this.props.avatars.find((avatar) => avatar.jenkinsAuthor == this.props.jenkinsAuthor);
    }
    if (avatar == null) {
      avatar = DEFAULT_AVATAR;
    }
    avatar.nick = this.props.jenkinsAuthor;
    return (
      <div className="build-author">
        <ScalableImage imgUrl={avatar.url} />
      </div>
    );
  }
}

BuildAuthor.propTypes = {
  avatars: PropTypes.array,
  jenkinsAuthor: PropTypes.string,
};

BuildAuthor.defaultProps = {
};

export default BuildAuthor;
