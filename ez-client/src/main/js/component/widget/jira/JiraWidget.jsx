import React from "react";
import PropTypes from "prop-types";
import AbstractWidget from "component/widget/base/AbstractWidget.jsx";
import ThresholdConfig from "config/ThresholdConfig";

export default class JiraWidget extends AbstractWidget {

  /**
   *  "issuesKeys" and "total" properties came from a dataSource, configured in the dashboard configuration.
   *  These properties are array because JSONPath always return arrays. As those data come from
   *  a generic dataSource system, only the Widget can know the real nature of those data.
   */
  static propTypes = {
    todoIssuesKeys: PropTypes.array,
    todoTotal: PropTypes.number,
    inProgressIssuesKeys: PropTypes.array,
    inProgressTotal: PropTypes.number
  };

  static defaultProps = {
    todoIssuesKeys: [],
    todoTotal: 0,
    inProgressIssuesKeys: [],
    inProgressTotal: 0
  };

  getWidgetClassNames() {
    return super
      .getWidgetClassNames()
      .concat(ThresholdConfig.get(
        this.props.thresholds.bugs,
        this.getTotal()));
  }

  getTotal() {
    return this.props.todoTotal + this.props.inProgressTotal;
  }

  renderHeader() {
    return (
      <h1>
        <strong>{this.getTotal()} </strong>
        <span>{this.props.title}</span>
      </h1>
    )
  }

  renderContent() {
    const { todoIssuesKeys, inProgressIssuesKeys } = this.props;
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

}
