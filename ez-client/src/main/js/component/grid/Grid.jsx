import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayoutAndLocalStorage = this.resetLayoutAndLocalStorage.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }

  resetLayoutAndLocalStorage() {
    this.setState({
      layouts: {}
    });
  }

  onResizeStop(layout, oldItem, newItem, placeholder, event, htmlElement) {
    console.log(" htmlElement : ", htmlElement.parentElement);
    console.log(" WIDTH : ", htmlElement.parentElement.offsetWidth);
    console.log(">>>>>>>>>>>>> htmlElement.offsetWidth : " + htmlElement.offsetWidth);
  }

  onLayoutChange(layout, layouts) {
    //this.saveToLS('layouts', layouts);
    this.setState({layouts});
    //console.log("SAVED LAYOUTS : ", JSON.stringify(layouts));
  }

  onWidthChange(containerWidth, margin, cols, containerPadding) {
    //console.log("onWidthChange ==> cols=" + cols);
  }

  onBreakpointChange(newBreakpoint, newColsNumber) {
    //console.log("onBreakpointChange : newBreakpoint=" + newBreakpoint + ", newColsNumber="+ newColsNumber);
  }

  componentWillUpdate() {
  }

  componentWillMount() {
  }

  render() {
    const { layouts, breakpoints, cols, rowHeight } = this.props.config.grid;
    return (
      <div>
        <ResponsiveReactGridLayout
          rowHeight={rowHeight}
          className="layout"
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onResizeStop={this.onResizeStop}
          onWidthChange={this.onWidthChange}>
          {this.props.widgets}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
