import React from "react";
import PropTypes from "prop-types";
import AbstractSprintWidget from "component/widget/base/AbstractSprintWidget.jsx";
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis } from "victory";
import VelocityCalculator from "utils/VelocityCalculator";
import DateService from "service/date/DateService";

export default class BurndownChartWidget extends AbstractSprintWidget {

  static propTypes = {
    dateTickCount: PropTypes.number
  };

  static defaultProps = {
    title: "BURNDOWN CHART",
    dateTickCount: 10
  };

  getTickValues(wantedValuesCount, dataArray) {
    let result = [];
    let step = Math.round(dataArray.length / wantedValuesCount);
    result.push(1);
    for (let i = 1; i < dataArray.length - step; i++) {
      if (i % step == 0) {
        result.push(i + 1);
      }
    }
    result.push(dataArray.length);
    return result;
  }

  renderContent() {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const now = DateService.now();
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
      <div>
        <VictoryChart
          width={1000}
          height={500}
          domainPadding={1}>
          <VictoryAxis
            tickValues={this.getTickValues(this.props.dateTickCount, velocity.plannedVelocity)}
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
      </div>
    );
  }


}
