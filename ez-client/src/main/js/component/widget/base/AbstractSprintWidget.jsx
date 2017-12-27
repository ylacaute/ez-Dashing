import React from 'react';
import PropTypes from 'prop-types';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import DateService from "service/date/DateService";
import VelocityCalculator from "utils/VelocityCalculator";
import DateUtils from "utils/DateUtils";
import Logger from 'utils/Logger';

const logger = Logger.getLogger("SprintWidget");

export default class AbstractSprintWidget extends AbstractWidget {

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
    this.timer = setInterval(() => {
      this.checkEndOfSprint();
    }, 3600 * 1000); // every hour
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  /**
   * If the current date is the last day of the sprint, between 23:00 and 23:59, the will call
   * onEndOfSprint method that sub widgets can override.
   */
  checkEndOfSprint() {
    const now = DateService.now();
    if (this.isLastDayOfSprint(now) && now.getHours() === 23) {
      logger.info("End of Sprint detected (now={})", now);
      this.onEndOfSprint();
    }
  }

  /**
   * By default do nothing but sub widgets can do actions at the end of Sprint
   */
  onEndOfSprint() {
  }

  /**
   * Return true it we are at the last day of the Sprint
   */
  isLastDayOfSprint(now) {
    return DateUtils.equalsAtDay(now, this.props.sprintEndDate);
  }

  computeVelocity(now) {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const allSprintIssues = closedIssues.concat(readyIssues);

    const velocity = VelocityCalculator.calculate(now, sprintStartDate, sprintEndDate, allSprintIssues);
    return {
      currentVelocity: velocity.currentVelocity[velocity.currentVelocity.length - 1].storyPoints,
      plannedVelocity: velocity.plannedVelocity[0].storyPoints,
    }
  }

  computeReliability(now) {
    const velocity = this.computeVelocity(now);
    return Math.floor(velocity.currentVelocity / velocity.plannedVelocity * 100);
  }

}
