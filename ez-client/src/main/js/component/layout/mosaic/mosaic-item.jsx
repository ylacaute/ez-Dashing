import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import "./mosaic-item.scss"

class MosaicItem extends React.PureComponent {

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
  };

  state = {
    className: ""
  };

  static getDerivedStateFromProps(props, state) {
    const {children, className} = props;

    return {
      className: cn("mosaic-item", className),
    }
  }

  render() {
    const {children, width, height} = this.props;
    const {className} = this.state;
    const style = {
      width: width,
      height: height,
    };
    return (
      <div className={className} style={style}>
        <div className="mosaic-item-inner">
          {children}
        </div>
      </div>
    );
  }
}

export default MosaicItem;
