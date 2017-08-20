import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import ThresholdConfig from "config/ThresholdConfig";
import ScalableImage from 'component/scalable/ScalableImage.jsx';

const MAX_DISPLAYABLE_ISSUES = 10;

export default class BugWidget extends AbstractWidget {

  /**
   *  "issuesKeys" and "total" properties came from a dataSource, configured in the dashboard configuration.
   *  These properties are array because JSONPath always return arrays. As those data come from
   *  a generic dataSource system, only the Widget can know the real nature of those data.
   */
  static propTypes = {
    inProgressBugs: PropTypes.array,
    todoBugs: PropTypes.array,
    noBugIcon: PropTypes.string
  };

  static defaultProps = {
    inProgressBugs: [],
    todoBugs: [],
    noBugIcon: "/img/good.png"
  };

  getWidgetClassNames() {
    return super
      .getWidgetClassNames()
      .concat(ThresholdConfig.get(
        this.props.thresholds.bugs,
        this.getTotal()));
  }

  getTotal() {
    return this.props.inProgressBugs.length + this.props.todoBugs.length;
  }

  renderHeader() {
    return (
      <h1>
        <strong>{this.getTotal()} </strong>
        <span>{this.props.title}</span>
      </h1>
    )
  }

  /**
   * Return the issues with MAX_DISPLAYABLE_ISSUES items at max.
   */
  getWithMaxItems(array) {
    const max = Math.min(array.length, MAX_DISPLAYABLE_ISSUES);
    return array.slice(0, max);
  }

  getKeys(bugs) {
    const items = this.getWithMaxItems(bugs);
    return items.map(i => i.key);
  }

  renderContent() {
    if (this.getTotal() == 0) {
      return this.renderEmptyBug();
    }
    const todoIssuesKeys = this.getKeys(this.props.todoBugs);
    const inProgressIssuesKeys = this.getKeys(this.props.inProgressBugs);

    const todoIssues = todoIssuesKeys.map((issueKey) =>
      <li key={issueKey}>
        <span className="icon todo"/>
        <span>{issueKey}</span>
      </li>
    );
    const inProgressIssues = inProgressIssuesKeys.map((issueKey) =>
      <li key={issueKey}>
        <span className="icon progress"/>
        <span>{issueKey}</span>
      </li>
    );
    return (
      <ul>
        {todoIssues}
        {inProgressIssues}
      </ul>
    )
  }

  renderEmptyBug() {
    return (
      <ScalableImage className="emptyBugIcon" src={this.props.noBugIcon}/>
    )
  }

}
