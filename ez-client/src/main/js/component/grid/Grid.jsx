import React from 'react';
import PropTypes from 'prop-types';
import {Responsive, WidthProvider} from 'react-grid-layout';
import BreakpointConfig from 'config/BreakpointConfig';
import WindowUtils from 'utils/WindowUtils';

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
  }

  /**
   * The first time the grid is mounted, we don't know yet the calculated size of elements as a result we
   * dispatch a resize event for all of them (these events will allow to add css breakpoint properties
   * for each widget, depending on there size).
   * When the grid is mounted, it does not always emit a layoutChange event, so we need to dispatch a
   * resize on mount, as the result, sometimes these events are duplicated on start but without any consequences.
   *
   * We could display widgets immediately but it is better to be sure the graphical stuff are totally done.
   * Indeed, the responsive behaviour of each widget depends on the previous resize event sent be cause of CSS
   * breakpoint class.
   * As the consequence, we arbitrary wait 500ms to dispatch grid Ready which will authorize widget to display
   * themselves. 500 ms is enormous but allow a better user experience : the user has time to clearly see the
   * loaders, then widgets.
   */
  componentDidMount() {
    const widgetIds = this.props.widgets.map(w => w.key);
    this.dispatchResizeToAllWidgets();
    setTimeout(() => {
      this.props.onGridReady(widgetIds);
    }, 500);
    WindowUtils.onResizeEnd(() => {
      this.dispatchResizeToAllWidgets();
    });
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
  dispatchResizeToAllWidgets(widgetIds) {
    const ids = widgetIds ? widgetIds : this.props.widgets.map(w => w.key);
    ids.forEach(wid => {
      setTimeout(() => {
        this.props.onElementResized(wid, this.getSizeInfo(wid));
      }, 0);
    });
  }

  /**
   * We need to send resize events to all widgets because all there size may have changed.
   */
  onLayoutChange(currentLayout, allLayouts) {
    this.dispatchResizeToAllWidgets();
    this.props.onLayoutChange(currentLayout, allLayouts);
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
