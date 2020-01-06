import React from "react";
import PropTypes from "prop-types";
import WidgetHeader from "component/widget/base/widget-header";
import WidgetContent from "component/widget/base/widget-content";
import Widget from "component/widget/base/widget";
import CircularProgressBar from "component/chart/progress-bar/circular";
import DateUtils from 'utils/date-utils';
import DateService from "service/date/date-service";
import Logger from 'utils/logger';
import cn from "classnames";

import "./sprint-widget.scss";

const logger = Logger.getLogger("SprintWidget");

export default class SprintWidget extends React.PureComponent {

  static propTypes = Object.assign({
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
  }, Widget.propTypes);

  static defaultProps = {
    title: "SPRINT",
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: DateService.now(),
    sprintEndDate: DateService.now(),
  };

  render() {
    const { className, title, sprintNumber, sprintStartDate, sprintEndDate } = this.props;
    const classNames = cn("sprint", className);
    const now = DateService.now();
    const sprintDurationInDays = DateUtils.diffInDays(sprintStartDate, sprintEndDate);
    const daysLeft = DateUtils.diffInDays(now, sprintEndDate);
    const progress = daysLeft / sprintDurationInDays * 100;
    logger.debug("Spring widget: " +
      "now={}, sprintEndDate={}, sprintDurationInDays={}, progress={}, daysLeft={}",
      now, sprintEndDate, sprintDurationInDays, progress, daysLeft);

    return (
      <Widget
        className={classNames}
        {...this.props}
      >
        <WidgetHeader>
          <h1>
            <span>{title}</span>
            <strong>{sprintNumber}</strong>
          </h1>
        </WidgetHeader>
        <WidgetContent>
          <CircularProgressBar
            value={progress}
            displayValue={daysLeft}
            label="days left"/>
        </WidgetContent>
      </Widget>
    )
  }

}
