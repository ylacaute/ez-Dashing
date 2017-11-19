import React from 'react';
import PropTypes from 'prop-types';
import AbstractSprintWidget from 'component/widget/base/AbstractSprintWidget.jsx';
import DateService from "service/date/DateService";
import ArrayUtils from "utils/ArrayUtils";
import Logger from 'utils/Logger';

const logger = Logger.getLogger("VelocityWidget");

/**
 * This widget as two purpose: display the velocity average of the team and emit an event with the
 * current velocity at the end of sprint (last day of sprint -1 hour). This event must be handled
 * in order to save this new velocity value in the configuration file.
 */
export default class VelocityWidget extends AbstractSprintWidget {

  static propTypes = {
    velocityHistory: PropTypes.array.isRequired,
    valueCountForAverage: PropTypes.number,
    lastSprintId: PropTypes.number.isRequired
  };

  static defaultProps = {
    velocityHistory: [],
    valueCountForAverage: 3,
    lastSprintId: 0
  };

  /**
   * We compute the current velocity (usually at end of sprint) and add this velocity to a new history array.
   * This array is saved in the widget configuration file.
   */
  updateVelocityHistory() {
    const now = DateService.now();
    const curVelo = this.computeVelocity(now).currentVelocity;
    const newVelocityHistory = [...this.props.velocityHistory, curVelo];

    logger.info("Updating velocityArray by adding the current sprint velocity={}", curVelo);
    this.props.updateWidgetConfig(this.props.id, {
      lastSprintId: this.props.sprintId,
      velocityHistory: newVelocityHistory
    });
  }

  onEndOfSprint() {
    if (this.props.lastSprintId != this.props.sprintId) {
      this.updateVelocityHistory();
    } else {
      logger.info("Velocity already up to date (lastSprintId={}, sprintId={})",
        this.props.lastSprintId,
        this.props.sprintId)
    }
  }

  renderContent() {
    const velocityAverage  = ArrayUtils.computeAverage(
      this.props.velocityHistory,
      this.props.valueCountForAverage);

    return (
      <div>
        <div>{velocityAverage}</div>
      </div>
    );
  }

}
