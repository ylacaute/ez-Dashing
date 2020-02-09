import React from 'react';
import {string, number, func, bool, object, oneOf, oneOfType} from 'prop-types';
import {ResponsivePie} from '@nivo/pie'
import {darkChartTheme} from "style/theme/dark-chart-theme";
import {merge} from 'lodash/object';
import PieChartDataNormalizer from './pie-chart-data-normalizer';

import "./pie-chart.scss"

/**
 * Full properties for chart: https://nivo.rocks/pie/
 */
export default class PieChart extends React.PureComponent {

  static DEFAULT_CHART_PROPS = {
    theme: darkChartTheme,
    sortByValue: true,
    startAngle: -180,
    innerRadius: 0.5,
    padAngle: 1,
    cornerRadius: 3,
    colors: d => d.color,
    borderWidth: 0,
    enableRadialLabels: false,
    radialLabelsTextColor: darkChartTheme.legends.text.color,
    slicesLabelsTextColor: darkChartTheme.legends.slicesLabelsTextColor,
    radialLabelsLinkColor: {
      from: 'color',
      modifiers: []
    },
    animate: true,
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
    const legendRightMargin = chartProps.legends.length === 0 ? 0 : 140;
    const radialLabelsHMargin = chartProps.enableRadialLabels ? 90 : 0;
    const radialLabelsVMargin = chartProps.enableRadialLabels ? 20 : 0;

    return {
      ...chartProps,
      margin: {
        top: baseMargin + radialLabelsVMargin,
        right: baseMargin + legendRightMargin + radialLabelsHMargin,
        bottom: baseMargin + radialLabelsVMargin,
        left: baseMargin + radialLabelsHMargin
      },
    }
  }

  static getDerivedStateFromProps(props) {
    const {data} = props;
   // const normalizedData = PieChartDataNormalizer.normalize(data);
    let chartProps = {...PieChart.DEFAULT_CHART_PROPS};
    chartProps = merge(chartProps, props);
    if (props.legends === null) {
      chartProps.legends = [];
    }
   // chartProps = merge(chartProps, PieChart.generateDataProps(normalizedData));
    chartProps = PieChart.adjustMargin(chartProps);

    return {
      chartProps: chartProps
    }
  }

  render() {
    const {chartProps} = this.state;
    return (
      <ResponsivePie {...chartProps} />
    );
  }
}
