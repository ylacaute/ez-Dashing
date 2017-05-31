import React from 'react';

// Test in progress...
class ColorfulImage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="colorfulImage">
        <svg height="0" width="0">
          <mask id="mymask">
            <image id="img" href="http://www.clker.com/cliparts/F/5/I/M/f/U/running-icon-white-on-transparent-background-md.png" x="0" y="0" height="50px" width="50px" />
          </mask>
        </svg>
      </div>
    );
  }
}

export default ColorfulImage;
