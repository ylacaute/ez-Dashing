import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import DateService from "service/date/DateService";
import VelocityCalculator from "component/widget/burndown/VelocityCalculator";
import DateUtils from "utils/DateUtils";
import ArrayUtils from "utils/ArrayUtils";

export default class VelocityWidget extends AbstractWidget {

  static propTypes = {
    velocity: PropTypes.array,
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  };

  static defaultProps = {
    velocity: [ 0 ],
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: DateService.now(),
    sprintEndDate: DateService.now(),
    closedIssues: [],
    readyIssues: [],
  };

  computeVelocityAverage() {
    let { velocity } = this.props;
    let lastValues = ArrayUtils.lasts(velocity, 3);
    console.log("lastValues (velo): ", lastValues);
    let sum = lastValues.reduce((sum, value) => sum + value, 0);
    return Math.floor(sum / lastValues.length);
  }

  computeFiabilityAverage(velocityAverage) {
    return Math.floor(velocityAverage.currentVelocity / velocityAverage.plannedVelocity * 100);
  }

  isLastDayOfSprint() {
    return DateUtils.equalsAtDay(DateService.now(), this.props.sprintEndDate);
  }

  computeVelocity() {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const allSprintIssues = closedIssues.concat(readyIssues);
    const now = DateService.now();
    const velocity = VelocityCalculator.calculate(now, sprintStartDate, sprintEndDate, allSprintIssues);
    return {
      currentVelocity: velocity.currentVelocity[velocity.currentVelocity.length - 1].storyPoints,
      plannedVelocity: velocity.plannedVelocity[0].storyPoints,
    }
  }

  renderContent() {
    const velocity = this.computeVelocity();
    const velocityAverage  = this.computeVelocityAverage();
    const fiabilityAverage = this.computeFiabilityAverage(velocityAverage);
    const isLastDayOfSprint = this.isLastDayOfSprint();

    console.log("===> velocity", velocity);
    console.log("===> velocityAverage", velocityAverage);
    console.log("===> fiabilityAverage", fiabilityAverage);
    console.log("===> isLastDayOfSprint", isLastDayOfSprint);
    return (
      <div>
        <div>{velocityAverage}</div>
      </div>
    );
  }

}
