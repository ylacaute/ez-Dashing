import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/Widget.jsx';

class ClockWidget extends React.Component {

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
            <div>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
            <div className="icon jenkins"/>
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
