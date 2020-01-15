import React from 'react';

import withBreakpoints from './with-breakpoints';

const InsideComponent = ({
  width,
  height,
  wBreakpointClass,
  hBreakpointClass}) => {

  let w = Math.round(Number.parseFloat(width));
  let h = Math.round(Number.parseFloat(height));

  return (
    <div>
      <p>{`${w}x${h}`}</p>
      <p><strong>{`${wBreakpointClass}`}</strong></p>
      <p><strong>{`${hBreakpointClass}`}</strong></p>
    </div>
   );
};

export default withBreakpoints(InsideComponent);
