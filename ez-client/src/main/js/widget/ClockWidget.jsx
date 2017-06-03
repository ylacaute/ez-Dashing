import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';
import BaseWidget from 'js/widget/BaseWidget.jsx';
import ScalableText from 'js/chart/ScalableTextWithIcon.jsx';

class ClockWidget extends BaseWidget {

  componentWillMount() {
    this.setTime();
  }

  componentDidMount() {
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  }

  setTime() {
    let now = new Date();
    let hours = now.getUTCHours() + this.props.UTCOffset;
    let minutes = now.getUTCMinutes();
    let seconds = now.getUTCSeconds();
    if (hours >= 24 ) hours -= 24;
    if (hours < 0) hours += 12;
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    this.setState({
      date: now.toDateString(),
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  render() {
    return (
      <Widget
        className="clock"
        title={this.props.displayName}
        content={
          <div>
            <ScalableText className="date"
                          text={this.state.date}
                          textAnchor="middle"/>
            <ScalableText className="time"
                          text={`${this.state.hours}:${this.state.minutes}:${this.state.seconds}`}
                          textAnchor="middle"/>
          </div>
        }
      />
    );
  }
}

ClockWidget.propTypes = {
  displayName: PropTypes.string
};

export default ClockWidget;
