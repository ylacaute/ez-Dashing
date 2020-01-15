import React from 'react';
import PropTypes, {bool, number, shape, string} from 'prop-types';
import cn from 'classnames';
import withBreakpoints from '../../hoc/with-breakpoints/with-breakpoints';
import {chunk} from "lodash";
import MosaicItem from './mosaic-item';

import "./mosaic.scss"

class Mosaic extends React.PureComponent {

  static propTypes = {
    /**
     * sdfsdf
     */
    name: string,
    /**
     * sdf
     */
    className: string,
    /**
     * sdf
     */
    wBreakpointClass: string,
    /**
     * sdf
     */
    hBreakpointClass: string,
    maxItemPerRow: number,
    maxRow: number,
    enableBreakpoints: bool,
  };

  static defaultProps = {
    className: null,
    enableBreakpoints: true,
    itemGap: "0"
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
