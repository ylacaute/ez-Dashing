import React from 'react';
import PropTypes from 'prop-types';
import {Responsive, WidthProvider} from 'react-grid-layout';
import BreakpointConfig from 'config/BreakpointConfig';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class Grid extends React.Component {

  static propTypes = {
    onElementResized: PropTypes.func,
  };

  static defaultProps = {
    onElementResized: () => {}
  };

  constructor(props) {
    super(props);
    this.initialized = false;
    this.resizedId = null;
  }

  /**
   * The first time the grid is mounted, we don't know yet the calculated size of elements so we
   * dispatch a resize event for all of them (those events will allow to add css breakpoint properties
   * depending there size)
   *
   * We set a timeout to 0 to be sure the graphical stuff are done before calculate right data.
   * We wait 500ms to dispatch grid Ready, it is not necessary but visually nicer.
   */
  componentDidMount() {
    if (!this.initialized) {
      const widgetIds = this.props.widgets.map(w => w.key);
      widgetIds.forEach(wid => {
        setTimeout(() => {
          this.props.onElementResized(wid, this.getSizeInfo(wid));
        }, 0);
      });
      setTimeout(() => {
        this.props.onGridReady(widgetIds);
        this.initialized = true;
      }, 500);
    }
  }

  getWidthClass(size) {
    return BreakpointConfig.getWidthClass(this.props.config.itemBreakpoints, size);
  }

  getHeightClass(size) {
    return BreakpointConfig.getHeightClass(this.props.config.itemBreakpoints, size);
  }

  onResizeStop(layout, oldItem, newItem, placeholder, event, htmlElement) {
    this.resizedId = htmlElement.parentElement.id;
  }

  getSizeInfo(domId) {
    const { offsetWidth, offsetHeight } = document.getElementById(domId);
    return {
      wBreakpointClass: this.getWidthClass(offsetWidth),
      hBreakpointClass: this.getHeightClass(offsetHeight),
      width: offsetWidth,
      height: offsetHeight
    }
  }

  /**
   * The timeout to 0 is necessary to be sure to have the good size.
   */
  onLayoutChange(layout) {
    if (this.resizedId != null) {
      setTimeout(() => {
        this.props.onElementResized(this.resizedId, this.getSizeInfo(this.resizedId));
        this.resizedId = null;
      }, 0);
    }
  }

  render() {
    const { layouts, breakpoints, cols, rowHeight } = this.props.config;
    return (
      <div>
        <ResponsiveReactGridLayout
          rowHeight={rowHeight}
          className="layout"
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          onLayoutChange={this.onLayoutChange.bind(this)}
          onResizeStop={this.onResizeStop.bind(this)}
        >
          {this.props.widgets}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
