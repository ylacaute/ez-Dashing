import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import ScalableText from 'js/core/ScalableText.jsx';
import CircularProgressBar from 'js/core/CircularProgressBar.jsx';
import DateUtils from 'js/utils/DateUtils.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';

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
class SprintWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = this.getCurrentSprintData();
  }

  refreshData() {
    this.setState(this.getCurrentSprintData());
  }

  getCurrentSprintData() {
    let now = new Date();
    let sprintNumber = 0;
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
          <ScalableText text={this.state.number.toString()}/>
        }
      />
    );
  }

  renderSprintDoneDaysWithProgress() {
    return (
      <Widget
        className="current-sprint days-done"
        title={this.props.displayName}
        content={
          <CircularProgressBar
            value={this.state.progress}
            displayValue={this.state.days}
            label="days"/>
        }
      />
    );
  }

  renderSprintDaysLeftWithProgress() {
    return (
      <Widget
        className="current-sprint days-left"
        customHeader={
          <header>
            <ScalableText
              className="title sprint-label"
              text="SPRINT"
              textAnchor="end"
              wViewPort={40}
            />
            <ScalableText
              className="title sprint-number"
              text={`#${this.state.number}`}
              textAnchor="start"
              wViewPort={18}
            />
          </header>
        }
        content={
          <CircularProgressBar
            value={this.state.progress}
            displayValue={this.state.daysLeft}
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
  displayType: PropTypes.oneOf(['daysLeft','daysDone', 'numberOnly']),
  sprintDates: PropTypes.array.isRequired,
  sprintDuration: PropTypes.number.isRequired,
  sprintOffset: PropTypes.number
};

SprintWidget.defaultProps = {
  refreshEvery: 3600,
  displayType: "daysLeft",
  sprintDates: [],
  sprintDuration: 0,
  sprintOffset: 0
};

export default SprintWidget;
