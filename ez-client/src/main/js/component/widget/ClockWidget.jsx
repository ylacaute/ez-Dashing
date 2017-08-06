import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class ClockWidget extends AbstractWidget {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object,
    UTCOffset: PropTypes.number,
    clock: PropTypes.object.isRequired
  };

  static defaultProps = {
    UTCOffset: 2
  };

  getClockData() {
    let now = this.props.clock.date;
    let hours = now.getUTCHours() + this.props.UTCOffset;
    let minutes = now.getUTCMinutes();
    let seconds = now.getUTCSeconds();
    if (hours >= 24 ) hours -= 24;
    if (hours < 0) hours += 12;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return {
      date: now.toLocaleDateString("fr-FR"),
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  renderContent() {
    const { date, hours, minutes, seconds } = this.getClockData();
    return (
      <div>
        <p>{date}</p>
        <p>{hours}:{minutes}:{seconds}</p>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    clock: state.clock,
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(
  mapStateToProps
)(ClockWidget)

