import React from "react";
import PropTypes, {bool, array, number, node, string, shape} from "prop-types";
import cn from "classnames";

import "./widget-content.scss";
import Mosaic from '../../layout/mosaic/mosaic';

export default class WidgetContent extends React.PureComponent {

  static propTypes = {
    className: string,
    children: node,
    /**
     * Please see <code>Mosaic</code> item to have field description
     */
    layout: shape({
      type: string,
      className: string,
      maxItemPerRow: number,
      maxRow: number,
      enableBreakpoints: bool,
    }),
    labels: array,
    items: array
  };

  static defaultProps = {
    className: '',
    layout: {},
    labels: [],
    items: []
  };

  static renderText(textObj, idx) {
    const textValue = textObj.value || "";
    const textStyle = textObj.style || "";
    return (
      <span
        className="text"
        key={idx}
        style={textStyle}
      >
        {textValue}
      </span>
    );
  }

  render() {
    const {className, layout, items, labels} = this.props;
    const classNames = cn(className, "layout-" + layout.type);
    const labelsElt = labels.map((textObj, idx) =>
      WidgetContent.renderText(textObj, idx)
    );

    let content;
    if (layout.type === "mosaic") {
      content = (
        <Mosaic {...layout} >
          {items}
        </Mosaic>
      )
    } else {
      content = items.map((i, idx) => (
        <div key={idx}>{i}</div>
      ));
    }

    return (
      <article className={classNames}>
        {labelsElt}
        {content}
        {this.props.children}
      </article>
    )
  }
}
