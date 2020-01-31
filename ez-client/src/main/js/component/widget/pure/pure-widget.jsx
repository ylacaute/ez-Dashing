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
import StringUtils from '../../../utils/string-utils';

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

  static normalizeContent(props) {
    let normalizedContent;

    if (!props.content) {
      normalizedContent = [{
        value: props.value,
        content: "${value}"
      }];
    }else {
      const contentType = typeof props.content;
      switch (contentType) {
        case "string":
          normalizedContent = [{
            value: props.value,
            content: props.content
          }];
          break;
        case "object":
          if (Array.isArray(props.content)) {
            console.log("should be here");
            normalizedContent = props.content;
          } else {
            normalizedContent = [props.content];
          }
          break;
        default:
          throw new Error(`Unknown content type ${contentType}`);
      }
    }
    normalizedContent = normalizedContent.map(elt => ({
      ...elt,
      type: elt.type || "metric",
      value: elt.value || "You must set the value property.",
      content: elt.content || "${value}"
    }));
    return {
      ...props,
      content: normalizedContent
    };
  }

  static getDerivedStateFromProps(props) {
    const {layout, labels, maxDisplayableItems, thresholds} = props;
    const updateProps = PureWidget.normalizeContent(props);
    console.log("updateProps :", updateProps);
    const itemConfigs = PureWidget.generateItemConfigs(updateProps);
    console.log("itemConfigs :", itemConfigs);

    const items = itemConfigs
      .map((cfg, idx) => PureWidget.generateItem(cfg, idx, thresholds))
      .slice(0, maxDisplayableItems);

    const resolvedLabels = labels.map(label => ({
      ...label,
      value: StringUtils.replaceVars(label.value, updateProps)
    }));

    return {
      className: cn(props.className),
      items: items,
      labels: resolvedLabels,
      layout: LayoutNormalizer.normalize(layout)
    }
  }

  static generateItemConfigs(props) {
    const {content} = props;
    const valueResolver = ValueResolver.create(props);
    const itemConfigs = content
      .flatMap((cfg) => {
          const resolvedValue = valueResolver(cfg.value);
          if (Array.isArray(resolvedValue)) {
            return resolvedValue.map((value) => ({
              ...cfg,
              value: value,
            }))
          } else {
            return {
              ...cfg,
              type: cfg.type,
              value: resolvedValue,
              legend: valueResolver(cfg.legend),
            };
          }
        }
      );
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
    const {className, items, layout, labels} = this.state;

    return (
      <Widget {...this.props} className={className}>
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
