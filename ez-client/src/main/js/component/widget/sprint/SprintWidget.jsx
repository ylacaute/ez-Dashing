import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import CircularProgressBar from "component/chart/CircularProgressBar.jsx";
import SprintCalculator from "component/widget/sprint/SprintCalculator";

export default class SprintWidget extends AbstractWidget {

  static propTypes = {
    sprintDates: PropTypes.array.isRequired,
    sprintDuration: PropTypes.number.isRequired,
    sprintOffset: PropTypes.number
  };

  static defaultProps = {
    title: "SPRINT",
    sprintDates: [],
    sprintDuration: 0,
    sprintOffset: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      days: 0,
      daysLeft: 0,
      progress: 0
    };
    this.timer = setInterval(this.refreshData.bind(this), 3600);
  }

  componentDidMount() {
    this.refreshData();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderHeader() {
    return (
      <h1>
        <span>{this.props.title}</span>
        <strong>{this.state.number}</strong>
      </h1>
    )
  }

  refreshData() {
    this.setState(SprintCalculator.calculateSprintData(
      new Date(),
      this.props.sprintDates,
      this.props.sprintDuration,
      this.props.sprintOffset
    ));
  }

  renderContent() {
    const { progress, daysLeft } = this.state;
    return (
        <CircularProgressBar
          value={progress}
          displayValue={daysLeft}
          label="days left"/>
    );
  }

}
