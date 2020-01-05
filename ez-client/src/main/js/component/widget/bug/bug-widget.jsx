import React from "react";
import PropTypes from "prop-types";
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import ThresholdConfig from "config/threshold-config";
import ScalableImage from 'component/scalable/image';
import cn from "classnames";

import "./bug-widget.scss";

export default class BugWidget extends React.PureComponent {

  /**
   *  "issuesKeys" and "total" properties came from a dataSource, configured in the dashboard configuration.
   *  These properties are array because JSONPath always return arrays. As those data come from
   *  a generic dataSource system, only the Widget can know the real nature of those data.
   */
  static propTypes = Object.assign({
    inProgressBugs: PropTypes.array,
    todoBugs: PropTypes.array,
    noBugIcon: PropTypes.string,
    thresholds: PropTypes.shape({
      bugs: PropTypes.shape({
        bad: PropTypes.number,
        avg: PropTypes.number,
        good: PropTypes.number,
      })
    }),
    maxDisplayableIssues: PropTypes.number,
  }, Widget.propTypes);

  static defaultProps = {
    inProgressBugs: [],
    todoBugs: [],
    thresholds: {
      bugs: {
        bad: 10,
        avg: 1,
        good: 0,
      }
    },
    maxDisplayableIssues: 10,
    noBugIcon: "img/good.png"
  };

  getWidgetClassNames() {
    return super
      .getWidgetClassNames()
      .concat(ThresholdConfig.get(
        this.props.thresholds.bugs,
        this.getTotal()))
      .concat(this.getTotal() === 0 ? "empty" : "")
  }

  getTotal() {
    return this.props.inProgressBugs.length + this.props.todoBugs.length;
  }

  /**
   * Return the issues with MAX_DISPLAYABLE_ISSUES items at max.
   */
  getWithMaxItems(array) {
    const max = Math.min(array.length, this.props.maxDisplayableIssues);
    return array.slice(0, max);
  }

  getKeys(bugs) {
    const items = this.getWithMaxItems(bugs);
    return items.map(i => i.key);
  }

  renderEmptyBug() {
    return (
      <ScalableImage className="no-bug-image"/>
    )
  }

  renderContent() {
    if (this.getTotal() === 0) {
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

  render() {
    const className = cn(
      this.props.className,
      ThresholdConfig.get(this.props.thresholds.bugs, this.getTotal()),
      this.getTotal() === 0 ? "empty" : ""
    );

    return (
      <Widget {...this.props} className={className}>
        <WidgetHeader>
          <strong>{this.getTotal()} </strong>
          <span>{this.props.title}</span>
        </WidgetHeader>
        <WidgetContent>
          {this.renderContent()}
        </WidgetContent>
      </Widget>
    )
  }

}


