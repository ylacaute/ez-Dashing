import React from 'react';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import { ResponsiveBar } from '@nivo/bar'
import { darkChartTheme } from "style/theme/dark-chart-theme";

import "./hello-bar-chart-widget.scss";

const data = [
  {
    "bugType": "P1",
    "Before": 110,
    "BeforeColor": "#ddd",
    "After": 153,
    "AfterColor": "#2268ae"
  },
  {
    "bugType": "P2",
    "Before": 18,
    "BeforeColor": "#ddd",
    "After": 146,
    "AfterColor": "#2268ae"
  },
  {
    "bugType": "P3",
    "Before": 199,
    "BeforeColor": "#ddd",
    "After": 68,
    "AfterColor": "#2268ae"
  }
];

export default class HelloBarChartWidget extends React.PureComponent {

  render() {
    return (
      <Widget {...this.props}>
        <WidgetHeader title={this.props.title} />
        <WidgetContent>
          <ResponsiveBar
            theme={darkChartTheme}
            data={data}
            keys={[ 'Before', 'After' ]}
            indexBy="bugType"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={d => d.data[`${d.id}Color`]}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Bug Type',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Count',
              legendPosition: 'middle',
              legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
              {
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
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </WidgetContent>
      </Widget>
    );
  }
};
