import React from 'react';
import {string, number, func, bool, object, oneOf, oneOfType} from 'prop-types';
import {ResponsiveBar} from '@nivo/bar'
import {darkChartTheme} from "style/theme/dark-chart-theme";
import {merge} from 'lodash/object';
import BarChartDataNormalizer from './bar-chart-data-normalizer';

import "./bar-chart.scss"

/**
 * Full properties for chart: https://nivo.rocks/bar/
 */
export default class BarChart extends React.PureComponent {

  static DEFAULT_CHART_PROPS = {
    theme: darkChartTheme,
    padding: 0.1,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: 32,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -40
    },
    legends: [{
      dataFrom: 'keys',
      anchor: 'bottom-right',
      direction: 'column',
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: 'left-to-right',
      itemOpacity: 0.85,
      symbolSize: 20
    }]
  };

  static propTypes = {
    data: object
  };

  static defaultProps = {
    data: {}
  };

  state = {
    chartProps: {}
  };

  static generateDataProps(data) {
    return {
      data: data.series,
      keys: Object.keys(data.colors),
      indexBy: data.indexBy,
      colors: (d) => data.colors[d.id]
    };
  }

  static adjustMargin(chartProps) {
    const baseMargin = 10;
    return {
      ...chartProps,
      margin: {
        top: baseMargin,
        right: chartProps.legends.length === 0
          ? baseMargin
          : 130,
        bottom: !chartProps.axisBottom
          ? baseMargin
          : !chartProps.axisBottom.legend
            ? 30
            : 50,
        left: !chartProps.axisLeft
          ? baseMargin
          : !chartProps.axisLeft.legend
            ? 30
            : 60
      },
    }
  }

  static getDerivedStateFromProps(props) {
    const {data} = props;
    const normalizedData = BarChartDataNormalizer.normalize(data);
    let chartProps = {...BarChart.DEFAULT_CHART_PROPS};
    chartProps = merge(chartProps, props);
    if (props.legends === null) {
      chartProps.legends = [];
    }
    chartProps = merge(chartProps, BarChart.generateDataProps(normalizedData));
    chartProps = BarChart.adjustMargin(chartProps);

    return {
      chartProps: chartProps
    }
  }

  render() {
    const {chartProps} = this.state;
    return (
      <ResponsiveBar {...chartProps} />
    );
  }
}
