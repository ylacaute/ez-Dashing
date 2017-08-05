import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Widget from 'component/widget/base/Widget.jsx';
import ScalableText from 'core/ScalableText.jsx';

class ClockWidget extends React.Component {

  static propTypes = {
    displayName: PropTypes.string,
    UTCOffset: PropTypes.number,
    clock: PropTypes.object.isRequired
  };

  static defaultProps = {
    UTCOffset: 2
  };

  constructor(props) {
    super(props);
  }

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
      date: now.toDateString(),
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  render() {
    const { date, hours, minutes, seconds } = this.getClockData();
    return (
      <Widget
        className="clock"
        title={this.props.displayName}
        content={
          <div>
            <ScalableText className="date"
                          text={date}
                          textAnchor="middle"/>
            <ScalableText className="time"
                          text={`${hours}:${minutes}:${seconds}`}
                          textAnchor="middle"/>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    clock: state.clock,
  };
};

export default connect(
  mapStateToProps
)(ClockWidget)

