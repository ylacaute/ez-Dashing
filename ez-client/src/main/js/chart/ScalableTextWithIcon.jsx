import React from 'react';
import PropTypes from 'prop-types';

import SvgArrow from 'js/chart/SvgArrow.jsx';


class ScalableTextWithIcon extends React.Component {

  getClassNames() {
    return "scalable-text " + this.props.className;
  }

  renderIcon(cfg) {
    return (
      <image xlinkHref={this.props.iconUrl}
             x={cfg.xIcon} y={cfg.yIcon} height={cfg.hIcon} width={cfg.wIcon} transform={cfg.iconTransform}/>
    );
  }

  shouldDisplayIcon() {
    return this.props.iconUrl != null;
  }

  getIconCfg(wViewPort, hViewPort) {
    const hIcon = hViewPort / 100 * this.props.hIconPercent;
    const wIcon = hIcon;
    const yIconAdjustment = -hViewPort / 100 * this.props.yIconAdjustmentPercent;
    const xIcon = 0;
    const xIconCenter = xIcon + wIcon / 2;
    const yIconCenter = xIcon + hIcon / 2;

    return {
      hIcon: hIcon,
      wIcon: wIcon,
      iconMarginRight: hViewPort / 100 * this.props.iconMarginRightPercent,
      yIconAdjustment: yIconAdjustment,
      yIcon: (hViewPort - hIcon) / 2 + yIconAdjustment,
      xIcon: xIcon,
      iconTransform: this.props.iconRotation == null ? "" :
        `rotate(${this.props.iconRotation}, ${xIconCenter}, ${yIconCenter})`
    }
  }

  renderTextOnly(wViewPort, hViewPort) {
    var xText = this.props.textAnchor == "middle" ? wViewPort / 2 : 0;
    var yText = hViewPort / 2;

    return (
      <div className={this.getClassNames()}>
        <svg width="100%" height="100%" viewBox={`0 0 ${wViewPort} ${hViewPort}`}>
          <text x={xText} y={yText} textAnchor={this.props.textAnchor}>
            {this.props.text}
          </text>
        </svg>
      </div>
    );
  }


  renderWithIcon(wViewPort, hViewPort, iconCfg) {
    var xText = iconCfg.wIcon + iconCfg.iconMarginRight;
    var yText = hViewPort / 2;

    if (this.props.textAnchor == "middle") {
      xText = wViewPort / 2 + iconCfg.wIcon / 2;
      yText = hViewPort / 2;
    }

    return (
      <div className={this.getClassNames()}>
        <svg width="100%" height="100%" viewBox={`0 0 ${wViewPort} ${hViewPort}`}>
          <text x={xText} y={yText} textAnchor={this.props.textAnchor}>
            {this.props.text}
          </text>
          {this.renderIcon(iconCfg)}
        </svg>
      </div>
    );
  }

  render() {
    const wViewPort = this.props.wViewPort ? this.props.wViewPort : 1 + this.props.text.length * 6;
    const hViewPort = 10;
    const iconCfg = this.getIconCfg(wViewPort, hViewPort);

    if (this.shouldDisplayIcon()) {
      return this.renderWithIcon(wViewPort, hViewPort, iconCfg);
    } else {
      return this.renderTextOnly(wViewPort, hViewPort);
    }
  }
}

ScalableTextWithIcon.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  wViewPort: PropTypes.number,
  iconUrl: PropTypes.string,
  iconRotation: PropTypes.number,
  textAnchor: PropTypes.string,
  grow: PropTypes.bool
};

ScalableTextWithIcon.defaultProps = {
  className: '',
  fixedWidth: 50,
  hIconPercent: 80,
  iconMarginRightPercent: 20,
  yIconAdjustmentPercent: 8,
  textAnchor: 'start',
  grow: true
};

export default ScalableTextWithIcon;
