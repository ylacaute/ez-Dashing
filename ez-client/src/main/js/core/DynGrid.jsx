import React from 'react';
import {render} from 'react-dom';
import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const DYN_GRID_LS_KEY = 'A_DYN_GRID_LS_KEY_26';

class DynGrid extends React.Component {

  constructor(props) {
    super(props);
    //var layouts =  this.getFromLS('layouts') || {};
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
    if (global.localStorage) {
      global.localStorage.setItem(DYN_GRID_LS_KEY, {});
    }
  }

  onResizeStop(layout, oldItem, newItem, placeholder, event, htmlElement) {
    //console.log(" htmlElement : ", htmlElement.parentElement);
    //console.log(" WIDTH : ", htmlElement.parentElement.offsetWidth);
    //console.log(">>>>>>>>>>>>> htmlElement.offsetWidth : " + htmlElement.offsetWidth);
  }

  onLayoutChange(layout, layouts) {
    this.saveToLS('layouts', layouts);
    this.setState({layouts});
    //console.log("SAVED LAYOUTS : ", JSON.stringify(layouts));
  }

  onWidthChange(containerWidth, margin, cols, containerPadding) {
    //console.log("onWidthChange ==> cols=" + cols);
  }

  getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem(DYN_GRID_LS_KEY)) || {};
      } catch(e) {
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (global.localStorage) {
      var valueToSave = JSON.stringify({[key]: value});
      global.localStorage.setItem(DYN_GRID_LS_KEY, valueToSave);
    }
  }

  onBreakpointChange(newBreakpoint, newColsNumber) {
    //console.log("onBreakpointChange : newBreakpoint=" + newBreakpoint + ", newColsNumber="+ newColsNumber);
  }

  componentWillUpdate() {
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={this.props.config.grid.layouts}
          breakpoints={this.props.config.grid.breakpoints}
          cols={this.props.config.grid.cols}
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

export default DynGrid;
