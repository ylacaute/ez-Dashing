import React from 'react';
import {Line} from 'react-progressbar.js';

class LinearProgressBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: props.progress
    }
  }

  render() {
    return (
      <Line
        progress={this.state.progress}
        text={'test'}
        options={{
          strokeWidth: 10
        }}
        initialAnimate={true}
        containerClassName={'.progressbar'} />
    )
  }
}

export default LinearProgressBar;
