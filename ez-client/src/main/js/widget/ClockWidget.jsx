import React from 'react';
import AbstractWidget from 'js/widget/AbstractWidget.jsx';

const DEFAULT_UTC_OFFSET = 2;

class ClockWidget extends AbstractWidget {

  constructor(props) {
    super(props);
  }

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
    let utcOffset = this.props.UTCOffset != null ? parseInt(this.props.UTCOffset) : DEFAULT_UTC_OFFSET;
    let hours = now.getUTCHours() + parseInt(utcOffset);

    // correct for number over 24, and negatives
    if (hours >= 24 ) {
      hours -= 24;
    }
    if (hours < 0) {
      hours += 12;
    }

    // add leading zero, first convert hours to string
    hours = hours + "";
    if (hours.length == 1) {
      hours = "0" + hours;
    }

    // minutes are the same on every time zone
    var minutes = now.getUTCMinutes();

    // add leading zero, first convert hours to string
    minutes = minutes + "";
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    var seconds = now.getUTCSeconds();
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  render() {
    return (
      <div className="clock-widget widget">
        <div id="clock">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
      </div>
    );
  }
}

export default ClockWidget;
