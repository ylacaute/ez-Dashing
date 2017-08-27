import React from 'react';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import LinearProgressBar from 'component/chart/LinearProgressBar.jsx';

export default class HelloWorldWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      inc: 0
    };
    setInterval(() => {this.setState({inc: this.state.inc + 10})}, 2000);
  }

  renderContent() {
    return (
      <div>
        <h2>Hello world !</h2>
        <LinearProgressBar percent={this.state.inc}/>
      </div>
    );
  }

  renderFooter() {
    return (
      <p>Footer</p>
    )
  }

}
