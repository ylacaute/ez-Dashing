import React from 'react';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis } from 'victory';


const plannedVelocity = [
  {date: '10-09-2017', storyPoints: 42},
  {date: '11-09-2017', storyPoints: 42},
  {date: '12-09-2017', storyPoints: 38},
  {date: '13-09-2017', storyPoints: 38},
  {date: '14-09-2017', storyPoints: 35},
  {date: '15-09-2017', storyPoints: 30},
  {date: '16-09-2017', storyPoints: 30},
  {date: '17-09-2017', storyPoints: 28},
  {date: '18-09-2017', storyPoints: 25},
  {date: '19-09-2017', storyPoints: 25},
  {date: '20-09-2017', storyPoints: 25},
  {date: '21-09-2017', storyPoints: 20},
  {date: '22-09-2017', storyPoints: 15},
  {date: '23-09-2017', storyPoints: 15},
  {date: '24-09-2017', storyPoints: 10},
  {date: '25-09-2017', storyPoints: 0}
];

const currentVelocity = [
  {date: '10-09-2017', storyPoints: 42},
  {date: '11-09-2017', storyPoints: 42},
  {date: '12-09-2017', storyPoints: 42},
  {date: '13-09-2017', storyPoints: 42},
  {date: '14-09-2017', storyPoints: 32},
  {date: '15-09-2017', storyPoints: 30},
  {date: '16-09-2017', storyPoints: 30},
  {date: '17-09-2017', storyPoints: 30},
  {date: '18-09-2017', storyPoints: 25},
  {date: '19-09-2017', storyPoints: 15},
  {date: '20-09-2017', storyPoints: 15}
];


export default class BurndownChartWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      inc: 0
    };
  }

  renderContent() {
    return (
      <VictoryChart
        width={1000}
        height={500}
        domainPadding={1}>
        <VictoryAxis
          tickValues={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
          tickFormat={(x, i) => x}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x} SP`)}
        />
        <VictoryArea
          data={plannedVelocity}
          x="date"
          y="storyPoints"
        />
        <VictoryLine
          data={plannedVelocity}
          x="date"
          y="storyPoints"
        />

        <VictoryLine
          className="currentVelocity"
          data={currentVelocity}
          x="date"
          y="storyPoints"
        />
      </VictoryChart>

    );
  }

}
