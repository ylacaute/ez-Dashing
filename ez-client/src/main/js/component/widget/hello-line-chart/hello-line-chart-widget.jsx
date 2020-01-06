import React from 'react';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import { ResponsiveLine } from '@nivo/line'
import { darkChartTheme } from "style/theme/dark-chart-theme";
import cn from "classnames";

import "./hello-line-chart-widget.scss"

const data = [
  {
    "id": "japan",
    "color": "hsl(92, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 46
      },
      {
        "x": "helicopter",
        "y": 27
      },
      {
        "x": "boat",
        "y": 14
      },
      {
        "x": "train",
        "y": 22
      },
      {
        "x": "subway",
        "y": 265
      },
      {
        "x": "bus",
        "y": 215
      },
      {
        "x": "car",
        "y": 28
      },
      {
        "x": "moto",
        "y": 168
      },
      {
        "x": "bicycle",
        "y": 227
      },
      {
        "x": "horse",
        "y": 95
      },
      {
        "x": "skateboard",
        "y": 161
      },
      {
        "x": "others",
        "y": 26
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(179, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 207
      },
      {
        "x": "helicopter",
        "y": 284
      },
      {
        "x": "boat",
        "y": 258
      },
      {
        "x": "train",
        "y": 5
      },
      {
        "x": "subway",
        "y": 59
      },
      {
        "x": "bus",
        "y": 77
      },
      {
        "x": "car",
        "y": 99
      },
      {
        "x": "moto",
        "y": 218
      },
      {
        "x": "bicycle",
        "y": 4
      },
      {
        "x": "horse",
        "y": 168
      },
      {
        "x": "skateboard",
        "y": 56
      },
      {
        "x": "others",
        "y": 62
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(296, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 174
      },
      {
        "x": "helicopter",
        "y": 161
      },
      {
        "x": "boat",
        "y": 193
      },
      {
        "x": "train",
        "y": 164
      },
      {
        "x": "subway",
        "y": 188
      },
      {
        "x": "bus",
        "y": 151
      },
      {
        "x": "car",
        "y": 8
      },
      {
        "x": "moto",
        "y": 156
      },
      {
        "x": "bicycle",
        "y": 36
      },
      {
        "x": "horse",
        "y": 197
      },
      {
        "x": "skateboard",
        "y": 69
      },
      {
        "x": "others",
        "y": 280
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(83, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 197
      },
      {
        "x": "helicopter",
        "y": 124
      },
      {
        "x": "boat",
        "y": 29
      },
      {
        "x": "train",
        "y": 223
      },
      {
        "x": "subway",
        "y": 229
      },
      {
        "x": "bus",
        "y": 76
      },
      {
        "x": "car",
        "y": 87
      },
      {
        "x": "moto",
        "y": 53
      },
      {
        "x": "bicycle",
        "y": 97
      },
      {
        "x": "horse",
        "y": 268
      },
      {
        "x": "skateboard",
        "y": 282
      },
      {
        "x": "others",
        "y": 179
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(289, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 44
      },
      {
        "x": "helicopter",
        "y": 236
      },
      {
        "x": "boat",
        "y": 283
      },
      {
        "x": "train",
        "y": 39
      },
      {
        "x": "subway",
        "y": 160
      },
      {
        "x": "bus",
        "y": 290
      },
      {
        "x": "car",
        "y": 239
      },
      {
        "x": "moto",
        "y": 204
      },
      {
        "x": "bicycle",
        "y": 8
      },
      {
        "x": "horse",
        "y": 293
      },
      {
        "x": "skateboard",
        "y": 195
      },
      {
        "x": "others",
        "y": 46
      }
    ]
  }
];

const yAxisFormatter = (value, idx) => {
  return `${value}%`
};

const xAxisFormatter = (value, idx) => {
  return value;
};

export default class HelloLineChartWidget extends React.PureComponent {

  render() {
    const classNames = cn("hello-line-chart", this.props.className);

    return (
      <Widget
        className={classNames}
        {...this.props}
      >
        <WidgetHeader title={this.props.title} />
        <WidgetContent>
          <ResponsiveLine
            theme={darkChartTheme}
            data={data}
            margin={{ top: 50, right: 50, bottom: 80, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', stacked: false, min: 0, max: 'auto' }}
            xFormat={(v) => `${v}`}
            yFormat={(v) => `${v}`}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 45,
              legend: '',
              legendOffset: 60,
              legendPosition: 'middle',
              format: xAxisFormatter
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: -40,
              legendPosition: 'middle',
              format: yAxisFormatter
            }}
            colors={{ scheme: 'nivo' }}
            //colors={d => d.color}
            borderColor={{ from: 'color', modifiers: [[ 'darker', 0.2 ]] }}
            lineWidth={1}
            pointSize={3}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.05}
            useMesh={true}
            legends={[
              {
                color: '#F00',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -50,
                itemsSpacing: 40,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: '#FF0'
              }
            ]}
          />
        </WidgetContent>
      </Widget>
    );
  }
};
