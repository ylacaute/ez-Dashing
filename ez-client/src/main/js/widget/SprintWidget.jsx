import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import ScalableText from 'js/core/ScalableText.jsx';
import CircularProgressBar from 'js/core/CircularProgressBar.jsx';
import DateUtils from 'js/utils/DateUtils';
import BaseWidget from 'js/widget/BaseWidget.jsx';

/**
 *  sprintDates should be an ordered array of dates corresponding to each start of sprint
 *
 *  Sample : [ "2017-01-01", "2017-02-01", "2017-03-02" ]
 *
 *  If now is 2017-01-05, then sprint number is 0
 *  If now is 2017-12-05, then sprint number is 2
 *
 *  Sprint duration is calculated between dates if found, or with current sprint date + sprint duration property.
 */
class SprintWidget extends BaseWidget {

  getCurrentSprintData() {
    let now = new Date();
    let sprintNumber = -1;
    let sprintStartDate = null;
    let nextStartDate = null;
    const arrayDates = this.props.sprintDates.map(DateUtils.parse);
    for (let i = arrayDates.length - 1; i >= 0; i--) {
      if (now > arrayDates[i]) {
        sprintNumber = i;
        sprintStartDate = arrayDates[i];
        if (i + 1 < arrayDates.length) {
          nextStartDate = arrayDates[i + 1];
        }
        break;
      }
    }
    const sprintDuration = nextStartDate != null ?
      DateUtils.diffInDays(sprintStartDate, nextStartDate) : this.props.sprintDuration;
    const sprintDays = DateUtils.diffInDays(sprintStartDate, now);

    return {
      number: sprintNumber + this.props.sprintOffset,
      days: sprintDays,
      daysLeft: sprintDuration - sprintDays,
      progress: sprintDays / sprintDuration * 100
    };
  }

  renderSprintNumberOnly() {
    return (
      <Widget
        className="current-sprint number-only"
        title="CURRENT SPRINT"
        content={
          <ScalableText text={this.getCurrentSprintData().number.toString()}/>
        }
      />
    );
  }

  renderSprintDoneDaysWithProgress() {
    let sprintData = this.getCurrentSprintData();
    return (
      <Widget
        className="current-sprint days-done"
        title={this.props.displayName}
        content={
          <CircularProgressBar
            value={sprintData.progress}
            displayValue={sprintData.days}
            label="days"/>
        }
      />
    );
  }

  renderSprintDaysLeftWithProgress() {
    let sprintData = this.getCurrentSprintData();
    return (
      <Widget
        className="current-sprint days-left"
        title={
          <span>SPRINT <strong>#7</strong></span>
        }
        content={
          <CircularProgressBar
            value={sprintData.progress}
            displayValue={sprintData.daysLeft}
            label="days left"/>
        }
      />
    );
  }

  render() {
    switch (this.props.displayType) {
      case "daysDone":
        return this.renderSprintDoneDaysWithProgress();
      case "numberOnly":
        return this.renderSprintNumberOnly();
      default:
        return this.renderSprintDaysLeftWithProgress();
    }
  }
}

SprintWidget.propTypes = {
  displayName: PropTypes.string,
  sprintDates: PropTypes.array.isRequired,
  displayType: PropTypes.string,
  sprintOffset: PropTypes.number
};

SprintWidget.defaultProps = {
  sprintNumber: -1,
  sprintOffset: 0,
  displayType: "daysLeft"
};

export default SprintWidget;
