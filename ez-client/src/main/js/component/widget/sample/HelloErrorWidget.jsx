import React from 'react';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

export default class HelloErrorWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    }
  }

  renderContent() {
    return (
      <div>
        <h2>This content will not be displayed because of its error state</h2>
      </div>
    );
  }

}
