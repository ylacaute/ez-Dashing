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
      legendOffset: 40,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -50
    },
    legends: [{
      itemTextColor: darkChartTheme.legends.text.color,
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
    let legendRightMargin = chartProps.legends.length ? 120 : 0;
    let bottomMargin = chartProps.axisBottom
      ? chartProps.axisBottom.legend ? chartProps.axisBottom.legendOffset : 20
      : 0;
    let leftMargin = chartProps.axisLeft
      ? chartProps.axisLeft.legend ? chartProps.axisBottom.legendOffset + 10 : 20
      : 0;
    return {
      ...chartProps,
      margin: {
        top: baseMargin,
        right: baseMargin + legendRightMargin,
        bottom: baseMargin + bottomMargin,
        left: baseMargin + leftMargin
      },
    }
  }

  static adjustMargin2(chartProps) {
    const baseMargin = 10;
    const legendRightMargin = chartProps.legends.length ? 120 : 0;
    const axisLeftMargin = chartProps.axisLeft ? 40 : 0;
    const legendBotMargin = chartProps.axisBottom ? 40 : 20;

    return {
      ...chartProps,
      margin: {
        top: baseMargin,
        right: baseMargin + legendRightMargin,
        bottom: baseMargin + legendBotMargin,
        left: baseMargin + axisLeftMargin
      },
    }
  }

  static getDerivedStateFromProps(props) {
    const {data} = props;
    const normalizedData = BarChartDataNormalizer.normalize(data);
    let chartProps = {...BarChart.DEFAULT_CHART_PROPS};
    chartProps = merge(chartProps, props);
    if (props.legends === null) {
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
