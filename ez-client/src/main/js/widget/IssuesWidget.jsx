import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'widget/base/Widget.jsx';
import RefreshableWidget from 'widget/base/RefreshableWidget.jsx';
import JiraClient from 'client/JiraClient.js';
import SimpleMetric from 'metric/base/SimpleMetric.jsx';
import ThresholdConfig from 'config/ThresholdConfig.jsx';
import DataSources from 'core/DataSources.jsx';

class IssuesWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      exception: null,
      issues: []
    };
  }

  loadIssue(issueConfig) {
    const query = "/rest/api/2/search?jql=" + issueConfig.query;
    DataSources.doGet('jira', query, (jsonResponse) => {
      // Hack for JsonServer which serve an Array instead of an object
      if (Array.isArray(jsonResponse)) {
        jsonResponse = jsonResponse[0];
      }
      console.log("JIRA RESPONSE : ", jsonResponse);
      const issue = {
        label : issueConfig.label,
        value : jsonResponse.total
      };
      this.setState((prevState) => {
        return {
          issues: [...prevState.issues, issue],
        }
      });
    }, (exception) => {
      console.log("Error during Jira request, details: ", exception);
      this.setState({exception: exception});
    });
  }

  refreshData() {
    const issueConfigs = this.props.issues;
    issueConfigs.forEach(this.loadIssue.bind(this));
  }

  renderIssue(issue) {
    return (
      <SimpleMetric
        key={issue.label}
        className="metric issues"
        label={issue.label}
        value={issue.value}
        fixedValueWidth={20}
        fixedLabelWidth={70}
        classForValue={(val) => ThresholdConfig.get(this.props.thresholds.issues, val)}
      />
    );
  }

  renderContent() {
    if (this.state.exception != null) {
      return this.renderError(this.state.exception);
    }
    if (this.state.issues.length < this.props.issues.length) {
      return this.renderLoadingContent();
    }
    const issues = this.state.issues.map(this.renderIssue.bind(this));
    return (
      <div>
        {issues}
      </div>
    );
  }

  render() {
    return (
      <Widget
        className="issues"
        title={this.props.displayName}
        content={this.renderContent()}
      />
    );
  }
}

IssuesWidget.propTypes = {
  displayName: PropTypes.string,
  thresholds: PropTypes.object,
  issues: PropTypes.array.isRequired,
};

IssuesWidget.defaultProps = {
  thresholds: { issues: 0 }
};

export default IssuesWidget;
