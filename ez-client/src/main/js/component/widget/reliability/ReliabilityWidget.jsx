import React from 'react';
import PropTypes from 'prop-types';
import AbstractSprintWidget from 'component/widget/base/AbstractSprintWidget.jsx';
import DateService from "service/date/DateService";
import ArrayUtils from "utils/ArrayUtils";
import Logger from 'utils/Logger';

const logger = Logger.getLogger("reliabilityWidget");

/**
 * This widget as two purpose: display the reliability average of the team and emit an event with the
 * current reliability at the end of sprint (last day of sprint -1 hour). This event must be handled
 * in order to save this new reliability value in the configuration file.
 */
export default class ReliabilityWidget extends AbstractSprintWidget {

  static propTypes = {
    reliabilityHistory: PropTypes.array.isRequired,
    valueCountForAverage: PropTypes.number,
    lastSprintId: PropTypes.number.isRequired
  };

  static defaultProps = {
    reliabilityHistory: [],
    valueCountForAverage: 3,
    lastSprintId: 0
  };

  /**
   * We compute the current reliability (usually at end of sprint) and add this reliability to a new history array.
   * This array is saved in the widget configuration file.
   */
  updateReliabilityHistory() {
    const now = DateService.now();
    const curRel = this.computeReliability(now);
    const newReliabilityHistory = [...this.props.reliabilityHistory, curRel];

    logger.info("Updating reliabilityArray by adding the current sprint reliability={}", curRel);
    this.props.updateWidgetConfig(this.props.id, {
      lastSprintId: this.props.sprintId,
      reliabilityHistory: newReliabilityHistory
    });
  }

  onEndOfSprint() {
    if (this.props.lastSprintId != this.props.sprintId) {
      this.updateReliabilityHistory();
    } else {
      logger.info("Reliability already up to date (lastSprintId={}, sprintId={})",
        this.props.lastSprintId,
        this.props.sprintId)
    }
  }

  renderContent() {
    const reliabilityAverage  = ArrayUtils.computeAverage(
      this.props.reliabilityHistory,
      this.props.valueCountForAverage);

    return (
      <div>
        <div>{reliabilityAverage}%</div>
      </div>
    );
  }

}
