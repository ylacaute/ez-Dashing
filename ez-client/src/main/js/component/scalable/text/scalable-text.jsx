import React from 'react';
import PropTypes from 'prop-types';
import "./scalable-text.scss";
import cn from 'classnames';
import StringUtils from '../../../utils/string-utils';

// Some tests:
// https://jsfiddle.net/4zgxjod9/41/
// https://jsfiddle.net/oqkabL41/1/

class ScalableText extends React.PureComponent {

  static FONT_SIZE = 16;

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: "",
  };

  state = {
    className: "",
  };

  /**
   * The magic is the viewPort width calculation, which is linked to the default font used (if
   * you change the font, this magic will not work anymore).
   */
  static getDerivedStateFromProps(props) {
    const {className, text} = props;
    const wViewPort = StringUtils.measureText(text, ScalableText.FONT_SIZE);

    return {
      className: cn("scalable-text", className),
      icon: null,
      wViewPort: wViewPort,
      hViewPort: 18,
    }
  };

  render() {
    const {className, wViewPort, hViewPort} = this.state;
    return (
      <div className={className}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${wViewPort} ${hViewPort}`}
          style={{fontSize: ScalableText.FONT_SIZE}}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
          >
            <strong>aaa</strong>
            {this.props.text}
          </text>
        </svg>
      </div>
    );
  }
}

export default ScalableText;
