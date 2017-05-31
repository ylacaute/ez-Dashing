import React from 'react';
import PropTypes from 'prop-types';

import ScalableImage from 'js/chart/ScalableImage.jsx'

class BuildAuthor extends React.Component {

  render() {
    let avatars = this.props.avatars;
    let avatar;
    if (avatars == null) {
      avatar = {
        nick: this.props.jenkinsAuthor,
        url: "/img/icon/anonymous_01.png"
      }
    } else {
      avatar = this.props.avatars.find((avatar) => avatar.jenkinsAuthor == this.props.jenkinsAuthor);
    }
    return (
      <div className="build-author">
        <ScalableImage url={avatar.url} />
        { this.props.displayName &&
        <label>{avatar.nick}</label>
        }
      </div>
    );
  }
}

BuildAuthor.propTypes = {
  avatars: PropTypes.array,
  jenkinsAuthor: PropTypes.string,
  displayName: PropTypes.bool
};

BuildAuthor.defaultProps = {
  displayValue: false
};

export default BuildAuthor;
