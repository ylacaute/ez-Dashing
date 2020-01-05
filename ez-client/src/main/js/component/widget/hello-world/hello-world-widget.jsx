import React from 'react';
import WidgetHeader from "component/widget/base/widget-header";
import WidgetFooter from "component/widget/base/widget-footer";
import WidgetContent from "component/widget/base/widget-content";
import Widget from "component/widget/base/widget";
import LinearProgressBar from 'component/chart/progress-bar/linear';

import "./hello-world-widget.scss";

export default class HelloWorldWidget extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      inc: 0
    };
    setInterval(() => {this.setState({inc: this.state.inc + 10})}, 2000);
  }

  render() {
    return (
      <Widget {...this.props}>
        <WidgetHeader
          title={this.props.title}
        />
        <WidgetContent>
          <h2>Hello world !</h2>
          <LinearProgressBar percent={this.state.inc}/>
        </WidgetContent>
        <WidgetFooter>
          <p>Footer</p>
        </WidgetFooter>
      </Widget>
    );
  }

}
