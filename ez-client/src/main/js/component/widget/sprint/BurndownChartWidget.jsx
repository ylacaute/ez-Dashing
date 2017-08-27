import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis } from "victory";
import VelocityCalculator from "component/widget/sprint/VelocityCalculator";

export default class BurndownChartWidget extends AbstractWidget {

  static propTypes = {
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  };

  static defaultProps = {
    title: "BURNDOWN CHART",
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: new Date(),
    sprintEndDate: new Date(),
    closedIssues: [],
    readyIssues: []
  };


  renderContent() {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const now = new Date();
    const allSprintIssues = closedIssues.concat(readyIssues);
    if (allSprintIssues.length == 0) {
      this.setState({
        hasError: true,
        error: {
          name: "No JIRA issues",
          message: "Please verify your request configuration"
        }
      });
    }
    const velocity = VelocityCalculator.calculate(now, sprintStartDate, sprintEndDate, allSprintIssues);

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
          data={velocity.plannedVelocity}
          x="date"
          y="storyPoints"
        />
        <VictoryLine
          data={velocity.plannedVelocity}
          x="date"
          y="storyPoints"
        />
        <VictoryLine
          data={velocity.currentVelocity}
          x="date"
          y="storyPoints"
        />
      </VictoryChart>
    );
  }


}
