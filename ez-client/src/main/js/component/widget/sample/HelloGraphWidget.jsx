import React from 'react';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

const {
  // main component
  Chart,
  // graphs
  Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
  // wrappers
  Layer, Animate, Transform, Handlers,
  // helpers
  helpers, DropShadow, Gradient
} = require('rumble-charts');

const series = [{
  data: [1, 2, 3]
}, {
  data: [5, 7, 11]
}, {
  data: [13, 17, 19]
}];

const series2 = [{
  name: 'sprintPlannedVelocity',
  data: [42, 42, 42, 40, 35, 35, 30, 10, 5, 5, 0]
}, {
  name: 'sprintCurrentVelocity',
  data: [42, 42, 32, 32, 32, 30, 25, 10, 5, 0, 0]
}];

const labels = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11"];

export default class HelloGraphWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      inc: 0
    };
    //setInterval(() => {this.setState({inc: this.state.inc + 10})}, 2000);
  }

  renderContent3() {
    return (
      <Chart width={600} height={250} minY={0} series={series2}>
        <Layer width='90%' height='90%'>
          <Bars opacity={0.5} />
          <Lines />
          <Dots />
        </Layer>
      </Chart>
    );
  }
  renderContent() {
    const series = series2;

    //label={({index, props}) => props.series[index].name}

    return (
      <Chart className="myChart" width={1600} height={400} series={series}
             minY={0}
             scaleX={{paddingStart: 0, paddingEnd: 0}}
             scaleY={{paddingTop: 10}}
      >
        <Layer width='90%' height='90%' position='top center'>
          <Ticks
            className="tick"
            axis='y'
            lineLength='100%'
            lineVisible={true}
            labelStyle={{textAnchor:'end', dominantBaseline:'middle'}}
            labelAttributes={{x: -10}}
          />
          <Ticks
            className="tick"
            axis='x'
            label={({index, props}) => {
              // console.log("CHART INDEX : ", index);
              // console.log("CHART PROPS : ", props);
              //return props.series[index].name;
              return labels[index];
            }}
            labelStyle={{textAnchor:'middle', dominantBaseline:'text-before-edge'}}
            labelAttributes={{y: 15}}
          />
          <Lines
            groupPadding='3%'
            innerPadding='0.5%'
          />
        </Layer>
      </Chart>
    );
  }

}
