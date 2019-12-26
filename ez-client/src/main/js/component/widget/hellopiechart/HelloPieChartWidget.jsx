import React from 'react';
import Widget from "component/widget/base/Widget";
import WidgetContent from "component/widget/base/WidgetContent";
import WidgetHeader from "component/widget/base/WidgetHeader";
import { ResponsivePie } from '@nivo/pie'
import { darkChartTheme } from "theme/DarkChartTheme";

const data = [
  {
    "id": "Not Runned",
    "value": 23,
    "color": "hsla(75,3%,73%,0.99)"
  },
  {
    "id": "Skipped",
    "value": 344,
    "color": "hsl(19,67%,55%)"
  },
  {
    "id": "Passed",
    "value": 317,
    "color": "#88b250"
  },
  {
    "id": "Failed",
    "value": 264,
    "color": "#ae3240"
  }
];

export default class HelloPieChartWidget extends React.Component {

  render() {
    return (
      <Widget {...this.props}>
        <WidgetHeader title={this.props.title} />
        <WidgetContent>
          <ResponsivePie
            theme={darkChartTheme}
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            startAngle={-180}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            //colors={{ scheme: 'nivo' }}
            colors={d => d.color}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.8' ] ] }}
            enableRadialLabels={false}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: 'ruby'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'c'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'go'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'python'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'scala'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'lisp'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'elixir'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'javascript'
                },
                id: 'lines'
              }
            ]}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemsSpacing: 20,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
              }
            ]}
          />
        </WidgetContent>
      </Widget>
    );
  }
};
