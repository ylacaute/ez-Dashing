import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import CircularProgressBar from "component/chart/CircularProgressBar.jsx";
import DateUtils from 'utils/DateUtils';

export default class SprintWidget extends AbstractWidget {

  static propTypes = {
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
  };

  static defaultProps = {
    title: "SPRINT",
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: new Date(),
    sprintEndDate: new Date(),
  };

  renderHeader() {
    return (
      <h1>
        <span>{this.props.title}</span>
        <strong>{this.props.sprintNumber}</strong>
      </h1>
    )
  }

  renderContent() {
    const { sprintStartDate, sprintEndDate } = this.props;
    const now = new Date();
    const sprintDuration = DateUtils.diffInDays(sprintStartDate, sprintEndDate);
    const daysLeft = DateUtils.diffInDays(now, sprintEndDate);
    const progress = daysLeft / sprintDuration * 100;

    return (
        <CircularProgressBar
          value={progress}
          displayValue={daysLeft}
          label="days left"/>
    );
  }

}
