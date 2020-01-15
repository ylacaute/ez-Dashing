import React from 'react';
import {any, array, number, oneOf, string, oneOfType} from "prop-types";
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import PureWidgetItem from "component/widget/pure/pure-widget-item";
import Logger from "utils/logger";
import cn from "classnames";
import ValueResolver from 'utils/value-resolver';

import "./pure-widget.scss"

const logger = Logger.getLogger("PureWidget");

// Careful : for list, we must use JsonPath
export default class PureWidget extends React.PureComponent {

  static propTypes = {
    ...Widget.propTypes,
    layout: oneOfType([
      string,
      any
    ]),

    /**
     * Complex object
     *  - type: "metric"
     *  - ...
     */
    content: any, // or array or string

    labels: array,
    maxItemPerRow: number,
    maxDisplayableItems: number,
  };

  static defaultProps = {
    layout: "mosaic",
    content: null,
    labels: [],
    maxDisplayableItems: 20
  };

  state = {
    className: "",
    layout: null,
    items: []
  };

  static getDerivedStateFromProps(props) {
    let items;
    const {layout, content, maxDisplayableItems, labels} = props;
    const valueResolver = ValueResolver.create(props);
    const resolvedLabels = labels.map(label => ({
      ...label,
      value: valueResolver(label.value)
    }));

    if (Array.isArray(content)) {
      items = content
        .map((cfg, idx) => PureWidget.generateItem(cfg, idx, valueResolver))
        .slice(0, maxDisplayableItems);
    } else {
      const resolvedContent = valueResolver(content, props); // list of anything from DS
      items = resolvedContent
        .map((value, idx) => PureWidget.generateItem({
          type: "metric",
          value: value
        }, idx, valueResolver))
        .slice(0, maxDisplayableItems);
    }


    return {
      className: cn("list", props.className),
      items: items,
      labels: resolvedLabels,
      layout: PureWidget.normalizeLayout(layout)
    }
  }

  static normalizeLayout(layout) {
    return (typeof layout != "string")
      ? layout
      : {
        name: layout,
        type: "metric"
      }
  }

  static generateItem(itemConfig, idx, valueResolver) {
    return (
      <PureWidgetItem
        key={idx}
        itemConfig={itemConfig}
        valueResolver={valueResolver}
      />
    );
  }

  render() {
    const {title, maxItemPerRow} = this.props;
    const {items, layout, labels} = this.state;
    return (
      <Widget {...this.props}>
        <WidgetHeader title={title}/>
        <WidgetContent
          layout={layout}
          labels={labels}
          items={items}
          maxItemPerRow={maxItemPerRow}
        />
      </Widget>
    );
  }

}
