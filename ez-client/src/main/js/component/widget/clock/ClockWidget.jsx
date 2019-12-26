import React from 'react';
import PropTypes from 'prop-types';
import Widget from "component/widget/base/Widget";
import WidgetContent from "component/widget/base/WidgetContent";
import DateService from "service/date/DateService";

export default class ClockWidget extends React.Component {

  static propTypes = Object.assign({
    UTCOffset: PropTypes.number
  }, Widget.propTypes);

  static defaultProps = {
    UTCOffset: 2
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.getClockData()
    };
    this.inteval = setInterval(() => {
      this.setState({
        ...this.getClockData()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inteval);
  }

  getClockData() {
    let now = DateService.now();
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

  render() {
    const { date, hours, minutes, seconds } = this.state;

    return (
      <Widget {...this.props}>
        <WidgetContent>
          <p>{date}</p>
          <p>{hours}:{minutes}:{seconds}</p>
        </WidgetContent>
      </Widget>
    )
  }

}
