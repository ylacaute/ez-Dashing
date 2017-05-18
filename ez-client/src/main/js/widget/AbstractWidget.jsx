import React from 'react';


class AbstractWidget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="widget">
      </div>
    );
  }

}

export default AbstractWidget;

