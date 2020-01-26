import React from 'react';
import {array, number, string, object, shape, oneOf, oneOfType} from "prop-types";
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import PureWidgetItem from "component/widget/pure/pure-widget-item";
import Logger from "utils/logger";
import cn from "classnames";
import ValueResolver from 'utils/value-resolver';
import LayoutNormalizer from './layout-normalizer';

import "./pure-widget.scss"
import ArrayUtils from '../../../utils/array-utils';

const logger = Logger.getLogger("PureWidget");

// Careful : for list, we must use JsonPath

const contentItem = {

};

export default class PureWidget extends React.PureComponent {

  static propTypes = {
    /**
     * Base widget props, see <code>Widget</code>.
     */
    ...Widget.propTypes,

    /**
     * The widget layout. It can be a single string which should be the loyout type or an object,
     * depending on you want to add options (layout props) or not.
     */
    layout: oneOfType([
      oneOf(["mosaic"]),
      shape({
        type: oneOf(["mosaic"]),
      })
    ]),

    /**
     * Content can be a string, a single object, or an array of object.
     * If the content is a string, the string is resolved (can be JsonPath or variable) and then
     * one or many items are created depending on the resolved value. Default items are metrics.
     *
     * If the content is an object, it must at least contains a value property who will be
     * resolved. One or many items will be created depending on the resolved value. The generated
     * items depend on which field are defined in this object (you can for example add a legend
     * property).
     *
     * If the content is an array, the array should defined each items configuration (the type,
     * the value, maybe others properties depending on the type).
     *
     * All these documentation is quite complex and need to be simplified... This is still a PoC.
     */
    content: oneOfType([
      string,
      object,
      array
    ]),

    /**
     * Labels allow you to add static text, please see Stories samples.
     */
    labels: array,

    /**
     * Max number of displayed items
     */
    maxDisplayableItems: number,


    thresholds: object,
  };

  static defaultProps = {
    layout: "mosaic",
    content: null,
    labels: [],
    maxDisplayableItems: 10
  };

  state = {
    className: "",
    layout: null,
    items: []
  };

  static getDerivedStateFromProps(props) {
    const {layout, labels, maxDisplayableItems, thresholds} = props;
    const valueResolver = ValueResolver.create(props);
    const itemConfigs = PureWidget.generateContentItems(valueResolver, props);
    const items = itemConfigs
      .map((cfg, idx) => PureWidget.generateItem(cfg, idx, thresholds))
      .slice(0, maxDisplayableItems);

    const resolvedLabels = labels.map(label => ({
      ...label,
      value: valueResolver(label.value)
    }));

    return {
      className: cn("list", props.className),
      items: items,
      labels: resolvedLabels,
      layout: LayoutNormalizer.normalize(layout)
    }
  }

  /**
   * TODO: add exception when value is empty or null or undefined with a message to help the user
   */
  static generateContentItems(valueResolver, props) {
    const {content} = props;
    const contentType = typeof content;
    let resolvedContent;
    let itemConfigs = [];

    switch (contentType) {

      // Here, content is defined with a single string, usually JsonPath or with variable (but
      // can also be a static text).
      // In fine, we generate an item array, containing one or more elements. As the content
      // is generated automatically, we use "metric" as default item type.
      case "string":
        resolvedContent = valueResolver(content, props);
        itemConfigs = ArrayUtils.toArray(resolvedContent)
          .map((value) => ({
          value: valueResolver(value, props)
        }));
        break;

      // When content is an object, we assume the user has given an already correct item
      // configuration, but we still need to resolve values.
      case "object":

        // When the user give an array of item configuration, we assume none of it is bind
        // on an dataSource array values, otherwise it become to complicated to display.
        if (Array.isArray(content)) {
          itemConfigs = content.map((cfg) => ({
            ...cfg,
            type: cfg.type,
            value: valueResolver(cfg.value, props),
            legend: valueResolver(cfg.legend, props),
          }));

        // And when the user give a single element, we have to manage to case where the value
        // is bind on a dataSource array values to generate multiple items.
        } else {
          itemConfigs = ArrayUtils
            .toArray(valueResolver(content.value))
            .map((value) => ({
              type: content.type,
              value: valueResolver(value, props),
              legend: valueResolver(content.legend, props),
            }));
        }
        break;
      default:
        throw new Error(`Unknown content type ${contentType}`);
    }
    return itemConfigs;
  }

  static generateItem(itemConfig, idx, thresholds) {
    return (
      <PureWidgetItem
        key={idx}
        itemConfig={{
          ...itemConfig,
          type: itemConfig.type || "metric",
          thresholds: itemConfig.thresholds || thresholds
        }}
      />
    );
  }

  render() {
    const {title} = this.props;
    const {items, layout, labels} = this.state;

    return (
      <Widget {...this.props}>
        <WidgetHeader title={title}/>
        <WidgetContent
          layout={layout}
          labels={labels}
          items={items}
        />
      </Widget>
    );
  }

}
