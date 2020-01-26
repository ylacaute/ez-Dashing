import React from 'react';
import PropTypes, {bool, number, string} from 'prop-types';
import cn from 'classnames';
import withBreakpoints from '../../hoc/with-breakpoints/with-breakpoints';
import {chunk} from "lodash";
import MosaicItem from './mosaic-item';

import "./mosaic.scss"

class Mosaic extends React.PureComponent {

  /**
   * Due to a Storybook bug: https://github.com/storybookjs/storybook/issues/9023
   * The props of this component are not displayed in Storybook.
   * This bug should be corrected fast in 2020.
   */
  static propTypes = {
    /**
     * Optional CSS Class to add for the Mosaic component
     */
    className: PropTypes.string,

    /**
     * Breakpoint CSS Class for width, computed with the HOC <code>withBreakpoints</code>
     */
    wBreakpointClass: string.isRequired,

    /**
     * Breakpoint CSS Class for height, computed with the HOC <code>withBreakpoints</code>
     */
    hBreakpointClass: string.isRequired,

    /**
     * The maximum displayed item per row. The limitation can also be set with breakpoints
     * if <code>enableBreakpoints</code> is true.
     * If not set, this value is computed dynamically to keep the natural item order.
     */
    maxItemPerRow: number,

    /**
     * The maximum row displayed. The limitation can also be set with breakpoints if
     * <code>enableBreakpoints</code> is true.
     */
    maxRow: number,

    /**
     * If enable, the number of displayed item per row and per column depend on the current
     * container breakpoints. If the container is too small, only first items are displayed.
     * As there are 4 possible breakpoint class, a maximum of 4 items can be displayed in a row
     * or in column (giving a maximum items to 16).
     * If disabled, all items are always displayed, depending only on the others properties
     * <code>maxItemPerRow</code> and <code>maxRow</code>.
     */
    enableBreakpoints: bool
  };

  static defaultProps = {
    className: null,
    maxItemPerRow: null,
    maxRow: null,
    enableBreakpoints: true,
  };

  state = {
    className: "",
    rows: null
  };

  static getDerivedStateFromProps(props) {
    const {
      className,
      wBreakpointClass,
      hBreakpointClass,
      maxItemPerRow,
      maxRow,
      enableBreakpoints} = props;
    const itemPerRow = maxItemPerRow || Mosaic.computeMaxItemPerRow(wBreakpointClass);

    return {
      className: cn(
        "mosaic",
        className,
        wBreakpointClass,
        hBreakpointClass,
        {enableBreakpoints}),
      rows: Mosaic.renderRows(props.children, itemPerRow, maxRow)
    }
  }

  static renderMosaicRow(row) {
    return row.map((item, idx) => (
      <MosaicItem key={idx}>
        {item}
      </MosaicItem>
    ))
  }

  static renderRows(children, maxItemPerRow, maxRow) {
    let mosaicItemsRows = chunk(React.Children.toArray(children), maxItemPerRow);

    if (maxRow) {
      mosaicItemsRows = mosaicItemsRows.slice(0, maxRow);
    }
    return mosaicItemsRows.map((row, idx) => (
      <div className="mosaic-row" key={idx}>
        {Mosaic.renderMosaicRow(row)}
      </div>
    ));
  }

  static computeMaxItemPerRow(wBreakpointClass) {
    switch (wBreakpointClass) {
      case "width-xs":
        return 1;
      case "width-sm":
        return 2;
      case "width-md":
        return 3;
      case "width-lg":
        return 4;
    }
  }

  render() {
    const {className, rows} = this.state;

    return (
      <div className={className}>
        {rows}
      </div>
    );
  }
}

export default withBreakpoints(Mosaic);
