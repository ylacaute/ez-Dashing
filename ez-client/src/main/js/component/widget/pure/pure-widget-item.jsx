import React from 'react';
import PropTypes from "prop-types";
import ScalableMetric from 'component/scalable/metric';

import "./pure-widget-item.scss";

export default class PureWidgetItem extends React.PureComponent {

  static propTypes = {
    itemConfig: PropTypes.any,
  };

  static defaultProps = {
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
        item = PureWidgetItem.generateMetricItem(itemConfig);
        break;
      default:
        item = <p>Unknown type {itemConfig.type}</p>
    }
    return {
      item: item
    }
  }

  static generateMetricItem(itemConfig) {
    return (
      <ScalableMetric
        {...itemConfig}
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
