import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'js/widget/base/Widget.jsx';
import RefreshableWidget from 'js/widget/base/RefreshableWidget.jsx';
import JiraClient from 'js/client/JiraClient.jsx';
import BugsMetric from 'js/metric/BugsMetric.jsx';

class BugsWidget extends RefreshableWidget {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      exception: null,
      total: 0,
      p1: 0,
      p2: 0,
      p3: 0
    };
  }

  refreshData() {
    JiraClient.getBugs((jsonResponse) => {
      this.setState({
        loaded: true,
        total: jsonResponse.total,
        p1: jsonResponse.details.p1,
        p2: jsonResponse.details.p2,
        p3: jsonResponse.details.p3
      });
    }, (exception) => {
      console.log("Error during Jira request, details: ", exception);
      this.setState({exception: exception});
    });
  }

  renderContent() {
    if (this.state.exception != null) {
      return this.renderError(this.state.exception);
    }
    if (this.state.loaded == false) {
      return this.renderLoadingContent();
    }
    return (
      <BugsMetric
        value={this.state.total}
        thresholds={this.props.thresholds.bugs}
      />
    );
  }

  render() {
    return (
      <Widget
        className="bugs"
        title={this.props.displayName}
        content={this.renderContent()}
      />
    );
  }
}

BugsWidget.propTypes = {
  displayName: PropTypes.string,
  thresholds: PropTypes.object
};

BugsWidget.defaultProps = {
  displayName: 'undefined',
  thresholds: { bugs: 0 }
};

export default BugsWidget;
