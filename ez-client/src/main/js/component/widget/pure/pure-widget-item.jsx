import React from 'react';
import PropTypes from "prop-types";
import ThresholdConfig from "config/threshold-config";
import ReactHtmlParser from 'react-html-parser';
import ScalableText from '../../scalable/text';
import ScalableMetric from 'component/scalable/metric';

import "./pure-widget-item.scss";

export default class PureWidgetItem extends React.PureComponent {

  /**
   * The metric value. If you don't define value, the content will be static.
   * The value can be an hardcoded number or string but this would result again into
   * a static behaviour. The idea is too match a datasource property. That's why the value
   * can be written like variable <code>${myDynamicProperty}</code> or with JsonPath
   * <code>$.myDynamicProperty</code>.
   */
    // itemConfig.value ...

  static propTypes = {
    itemConfig: PropTypes.any,
    valueResolver: PropTypes.func
  };

  static defaultProps = {
    valueResolver: (value) => value
  };

  state = {
    className: "",
    item: null
  };

  static getDerivedStateFromProps(props) {
    const {itemConfig} = props;
    let item;

    switch (itemConfig.type) {
      case "metric":
        item = PureWidgetItem.generateMetricItem(props);
        break;
      default:
        item = <p>Unknown type {itemConfig.type}</p>
    }
    return {
      item: item
    }
  }

  static generateMetricItem(props) {
    const {itemConfig, valueResolver} = props;
    let updatedConfig = {
      ...itemConfig,
      value: valueResolver(itemConfig.value),
      legend: valueResolver(itemConfig.legend)
    };
    return (
      <ScalableMetric
        {...updatedConfig}
      />);
  }


  render() {
    const {item} = this.state;
    return (
      <>
        {item}
      </>
    );
  }

};
