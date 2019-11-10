import React from "react";
import PropTypes from "prop-types";
import Widget from "component/widget/base/Widget.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";
import { VictoryChart, VictoryArea, VictoryLine, VictoryAxis } from "victory";
import VelocityCalculator from "utils/VelocityCalculator";
import DateService from "service/date/DateService";

export default class BurndownChartWidget extends React.Component {

  static propTypes = Object.assign({
    dateTickCount: PropTypes.number,
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  }, Widget.propTypes);

  static defaultProps = {
    title: "BURNDOWN CHART",
    dateTickCount: 10,
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: DateService.now(),
    sprintEndDate: DateService.now(),
    closedIssues: [],
    readyIssues: []
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

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

  static getDerivedStateFromProps(props, state) {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = props;
    const allSprintIssues = closedIssues.concat(readyIssues);
    if (allSprintIssues.length == 0) {
      return {
        hasError: true,
        error: {
          name: "No JIRA issues",
          message: "Please verify your request configuration"
        }
      };
    }
    return state;
  }

  render() {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const now = DateService.now();
    const allSprintIssues = closedIssues.concat(readyIssues);
    const velocity = VelocityCalculator.calculate(now, sprintStartDate, sprintEndDate, allSprintIssues);

    return (
      <Widget {...this.props}>
        <WidgetContent>
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
        </WidgetContent>
      </Widget>
    )
  }


}
