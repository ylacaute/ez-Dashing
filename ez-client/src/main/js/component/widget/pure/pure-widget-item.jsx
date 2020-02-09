import React from 'react';
import PropTypes from "prop-types";
import ScalableMetric from 'component/scalable/metric';
import BarChart from 'component/chart/bar';
import PieChart from 'component/chart/pie';

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
    const item = PureWidgetItem.generateItem(itemConfig);

    return {
      item: item
    }
  }

  static generateItem(itemConfig) {
    switch (itemConfig.type) {
      case "metric":
        return <ScalableMetric {...itemConfig}/>;
      case "bar-chart":
        return <BarChart {...itemConfig}/>;
      case "pie-chart":
        return <PieChart {...itemConfig}/>;
      default:
        return <p>Unknown type {itemConfig.type}</p>
    }
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
