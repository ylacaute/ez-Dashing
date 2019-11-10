import React from "react";
import PropTypes from "prop-types";
import WidgetHeader from "component/widget/base/WidgetHeader.jsx";
import WidgetContent from "component/widget/base/WidgetContent.jsx";
import Widget from "component/widget/base/Widget.jsx";
import CircularProgressBar from "component/chart/CircularProgressBar.jsx";
import DateUtils from 'utils/DateUtils';
import DateService from "service/date/DateService";
import Logger from 'utils/Logger';

const logger = Logger.getLogger("SprintWidget");

export default class SprintWidget extends React.Component {

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
    const now = DateService.now();
    const sprintDuration = DateUtils.diffInDays(sprintStartDate, sprintEndDate);
    const daysLeft = DateUtils.diffInDays(now, sprintEndDate);
    const progress = daysLeft / sprintDuration * 100;

    logger.info("Spring widget: sprintEndDate={}, sprintDuration={}, progress={}, daysLeft={}", sprintEndDate, sprintDuration, progress, daysLeft);

    return (
      <Widget {...this.props} className={className}>
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
