import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/Widget.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";
import WidgetHeader from "component/widget/base/WidgetHeader.jsx";
import DateService from "service/date/DateService";
import ArrayUtils from "utils/ArrayUtils";
import Logger from 'utils/Logger';
import cn from "classnames";
import VelocityCalculator from 'utils/VelocityCalculator';

const logger = Logger.getLogger("VelocityWidget");

/**
 * This widget display the velocity average of the team and emit an event with the
 * current velocity at the end of sprint (last day of sprint -1 hour). This event must be handled
 * in order to save this new velocity value in the configuration file.
 *
 *
 * /!\ THIS WIDGET IS NOT WORKING AND WILL BE RECODED
 * https://community.atlassian.com/t5/Answers-Developer-Questions/Sprint-Velocity-using-Jira-Agile-REST-API/qaq-p/539237
 *
 * /rest/greenhopper/1.0/rapid/charts/velocity?rapidViewId=[INSERT AGILE BOARD ID]&sprintId=[INSERT SPRINT ID]
 */
export default class VelocityWidget extends React.Component {

  static propTypes = Object.assign({
    velocityHistory: PropTypes.array.isRequired,
    valueCountForAverage: PropTypes.number,
    lastSavedSprintId: PropTypes.string.isRequired,
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  }, Widget.propTypes);

  static defaultProps = {
    valueCountForAverage: 3,
    lastSavedSprintId: "-",
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

  static getDerivedStateFromProps(props, state) {
    if (props.lastSavedSprintId != props.sprintId) {
      logger.info(`NEED TO UPDATE CONFIG, props.lastSavedSprintId=${props.lastSavedSprintId}, props.sprintId=${props.sprintId}`);
    }
    return state;
  }

  computeVelocity(now, sprintStartDate, sprintEndDate, allSprintIssues) {
    const velocity = VelocityCalculator.calculate(now, sprintStartDate, sprintEndDate, allSprintIssues);
    return {
      currentVelocity: velocity.currentVelocity[velocity.currentVelocity.length - 1].storyPoints,
      plannedVelocity: velocity.plannedVelocity[0].storyPoints,
    }
  }

  /**
   * We compute the current velocity (usually at end of sprint) and add this velocity to a new history array.
   * This array is saved in the widget configuration file.
   */
  updateVelocityHistory() {
    const { sprintStartDate, sprintEndDate, closedIssues, readyIssues } = this.props;
    const now = DateService.now();
    const allSprintIssues = closedIssues.concat(readyIssues);
    const curVelocity = this.computeVelocity(
      now,
      sprintStartDate,
      sprintEndDate,
      allSprintIssues).currentVelocity;

    const newVelocityHistory = [...this.props.velocityHistory, curVelocity];

    logger.info("Updating velocityArray by adding the current sprint velocity={}", curVelocity);
    this.props.updateWidgetConfig(this.props.id, {
      lastSavedSprintId: this.props.sprintId,
      velocityHistory: newVelocityHistory
    });
  }

  onEndOfSprint() {
    if (this.props.lastSavedSprintId != this.props.sprintId) {
      this.updateVelocityHistory();
    } else {
      logger.info("Velocity already up to date (lastSavedSprintId={}, sprintId={})",
        this.props.lastSavedSprintId,
        this.props.sprintId)
    }
  }

  render() {
    const className = cn(this.props.className);
    const velocityAverage  = ArrayUtils.computeAverage(
      this.props.velocityHistory,
      this.props.valueCountForAverage);

    return (
      <Widget {...this.props} className={className}>
        <WidgetHeader
          title={this.props.title}
        />
        <WidgetContent>
          <div>{velocityAverage}</div>
        </WidgetContent>
      </Widget>
    );
  }

}
