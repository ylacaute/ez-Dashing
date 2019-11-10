import React from 'react';
import Widget from "component/widget/base/Widget.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";


export default class HelloErrorWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    }
  }

  render() {
    return (
      <Widget {...this.props}>
        <WidgetContent>
          <h2>This content will not be displayed because of its error state</h2>
        </WidgetContent>
      </Widget>
    );
  }

}
