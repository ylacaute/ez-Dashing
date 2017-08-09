import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import CircularProgressBar from 'component/chart/CircularProgressBar.jsx';
import SprintCalculator from 'component/widget/sprint/SprintCalculator';

class SprintWidget extends AbstractWidget {

  static propTypes = {
    sprintDates: PropTypes.array.isRequired,
    sprintDuration: PropTypes.number.isRequired,
    sprintOffset: PropTypes.number
  };

  static defaultProps = {
    sprintOffset: 0,
    title: 'SPRINT',
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(mapStateToProps)(SprintWidget)

