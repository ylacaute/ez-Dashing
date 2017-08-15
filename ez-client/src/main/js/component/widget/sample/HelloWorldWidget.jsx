import React from 'react';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

export default class HelloWorldWidget extends AbstractWidget {

  renderContent() {
    return (
      <div>
        <h2>Hello world !</h2>
      </div>
    );
  }

  renderFooter() {
    return (
      <p>Footer</p>
    )
  }

}
