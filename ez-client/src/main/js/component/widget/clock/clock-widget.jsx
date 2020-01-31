import React from 'react';
import {bool} from 'prop-types';
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import DateService from "service/date/date-service";
import ScalableText from 'component/scalable/text';
import cn from "classnames";

import "./clock-widget.scss";

export default class ClockWidget extends React.PureComponent {

  static propTypes = {
    ...Widget.propTypes,
    displayTime: bool
  };

  static defaultProps = {
    displayTime: true
  };

  interval = null;

  state = {
    className: "",
    localDate: "--",
    time: "--"
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.getClockData()
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      className: cn("clock", props.className)
    }
  }

  componentDidMount() {
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
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return {
      localDate: now.toLocaleDateString("fr-FR").toString(),
      time: `${hours}:${minutes}:${seconds}`
    };
  }

  render() {
    const {className, localDate, time} = this.state;
    const {displayTime} = this.props;

    return (
      <Widget
        className={className}
        {...this.props}
      >
        <WidgetContent>
          <ScalableText text={localDate}/>
          { displayTime &&
            <ScalableText text={time} fontSize={10}/>
          }
        </WidgetContent>
      </Widget>
    )
  }

}
