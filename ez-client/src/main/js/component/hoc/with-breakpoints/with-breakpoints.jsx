import React from 'react';
import PropTypes from 'prop-types';
import {withResizeDetector} from 'react-resize-detector';

import "./with-breakpoints.scss";


function getBreakpointKey(breakpoints, value) {
  let result;

  if (breakpoints) {
    result = Object
      .keys(breakpoints)
      .find(propertyName => value >= breakpoints[propertyName])
  }
  return result || "xs";
}

const DEFAULT_BREAKPOINTS = {
  width: {
    lg: 550,
    md: 400,
    sm: 250,
    xs: 100,
  },
  height: {
    lg: 400,
    md: 300,
    sm: 200,
    xs: 100,
  }
};

const withBreakpoints = (Component, breakPoints = DEFAULT_BREAKPOINTS) => {

  return withResizeDetector(class extends React.Component {

    static propTypes = {
      /**
       * width calculated by withResizeDetector HOC
       */
      width: PropTypes.number,
      /**
       * height calculated by withResizeDetector HOC
       */
      height: PropTypes.number,
    };

    state = {
      wBreakPointClass: "",
      hBreakpointClass: "",
    };

    static getDerivedStateFromProps(props) {
      return {
        wBreakpointClass: "width-"
          + getBreakpointKey(breakPoints.width, props.width),
        hBreakpointClass: "height-"
          + getBreakpointKey(breakPoints.height, props.height)
      }
    }

    render() {
      const {wBreakpointClass, hBreakpointClass} = this.state;

      return (
        <Component
          {...this.props}
          wBreakpointClass={wBreakpointClass}
          hBreakpointClass={hBreakpointClass}
        />
      );
    }

  })
};

export default withBreakpoints;