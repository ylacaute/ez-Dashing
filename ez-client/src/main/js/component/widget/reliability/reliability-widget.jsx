import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import DateService from "service/date/date-service";
import ArrayUtils from "utils/array-utils";
import cn from "classnames";
import Logger from 'utils/logger';

import "./reliability-widget.scss";

const logger = Logger.getLogger("ReliabilityWidget");

/**
 * This widget as two purpose: display the reliability average of the team and emit an event with the
 * current reliability at the end of sprint (last day of sprint -1 hour). This event must be handled
 * in order to save this new reliability value in the configuration file.
 *
 * /!\ DO NOT USE THIS WIDGET, NOT WORKING, WILL BE RECODED
 *
 */
export default class ReliabilityWidget extends React.PureComponent {

  static propTypes = Object.assign({
    reliabilityHistory: PropTypes.array.isRequired,
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
    reliabilityHistory: [],
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
      lastSavedSprintId: this.props.sprintId,
      reliabilityHistory: newReliabilityHistory
    });
  }

  onEndOfSprint() {
    if (this.props.lastSavedSprintId != this.props.sprintId) {
      this.updateReliabilityHistory();
    } else {
      logger.info("Reliability already up to date (lastSavedSprintId={}, sprintId={})",
        this.props.lastSavedSprintId,
        this.props.sprintId)
    }
  }

  render() {
    const className = cn(this.props.className);
    const reliabilityAverage  = ArrayUtils.computeAverage(
      this.props.reliabilityHistory,
      this.props.valueCountForAverage);

    return (
      <Widget {...this.props} className={className}>
        <WidgetHeader
          title={this.props.title}
        />
        <WidgetContent>
          <div>{reliabilityAverage}%</div>
        </WidgetContent>
      </Widget>
    );
  }

}
