import React from 'react';
import WidgetHeader from "component/widget/base/WidgetHeader";
import WidgetFooter from "component/widget/base/WidgetFooter";
import WidgetContent from "component/widget/base/WidgetContent";
import Widget from "component/widget/base/Widget";
import LinearProgressBar from 'component/chart/LinearProgressBar.jsx';

export default class HelloWorldWidget extends React.Component {

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
