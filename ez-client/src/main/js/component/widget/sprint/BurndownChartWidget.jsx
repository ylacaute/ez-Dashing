import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis } from "victory";
import SprintCalculator from "component/widget/sprint/SprintCalculator";
import VelocityCalculator from "component/widget/sprint/VelocityCalculator";

export default class BurndownChartWidget extends AbstractWidget {

  static propTypes = {
    sprintDates: PropTypes.array.isRequired,
    sprintDuration: PropTypes.number.isRequired,
    sprintOffset: PropTypes.number,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  };

  static defaultProps = {
    title: "BURNDOWN CHART",
    sprintDates: [],
    sprintDuration: 0,
    sprintOffset: 0,
    closedIssues: [],
    readyIssues: []
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      days: 0,
      daysLeft: 0,
      progress: 0
    };
    this.timer = setInterval(this.refreshData.bind(this), 3600);
  }

  componentDidMount() {
    this.refreshData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  refreshData() {
    this.setState(SprintCalculator.calculateSprintData(
      new Date(),
      this.props.sprintDates,
      this.props.sprintDuration,
      this.props.sprintOffset
    ));
  }

  renderContent() {
    const now = new Date();
    const { number, dates } = this.state;
    const currentClosedIssues = this.props.closedIssues.filter(i => i.sprintNumber == number);
    const currentReadyIssues = this.props.readyIssues.filter(i => i.sprintNumber == number);
    const allSprintIssues = currentClosedIssues.concat(currentReadyIssues);
    const plannedVelocity = VelocityCalculator.calculatePlannedVelocity(dates, allSprintIssues);
    const currentVelocity = VelocityCalculator.calculateVelocity(now, dates, allSprintIssues);

    return (
      <VictoryChart
        width={1000}
        height={500}
        domainPadding={1}>
        <VictoryAxis
          tickValues={[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]}
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
          data={currentVelocity}
          x="date"
          y="storyPoints"
        />
      </VictoryChart>
    );
  }


}
