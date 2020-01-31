import React from 'react';
import {string, number} from 'prop-types';
import cn from 'classnames';
import StringUtils from 'utils/string-utils';

import "./scalable-text.scss";

// Some tests:
// https://jsfiddle.net/4zgxjod9/41/
// https://jsfiddle.net/oqkabL41/1/

class ScalableText extends React.PureComponent {

  static propTypes = {
    className: string,
    text: string.isRequired,
    fontSize: number
  };

  static defaultProps = {
    className: "",
    fontSize: 16
  };

  state = {
    className: "",
  };

  /**
   * The magic is the viewPort width calculation, which is linked to the default font used (if
   * you change the font, this magic will not work anymore).
   */
  static getDerivedStateFromProps(props) {
    const {className, text, fontSize} = props;
    const wViewPort = StringUtils.measureText(text, fontSize);

    return {
      className: cn("scalable-text", className),
      icon: null,
      wViewPort: wViewPort + 1, // +1 is magic, needed in rare and unexplainable case
      hViewPort: 18,
    }
  };

  render() {
    const {fontSize} = this.props;
    const {className, wViewPort, hViewPort} = this.state;
    return (
      <div className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${wViewPort} ${hViewPort}`}
          style={{fontSize: fontSize}}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
          >
            {this.props.text}
          </text>
        </svg>
      </div>
    );
  }
}

export default ScalableText;
