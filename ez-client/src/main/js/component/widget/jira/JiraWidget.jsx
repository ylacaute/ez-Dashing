import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPath from 'jsonpath';
import ObjectUtils from 'utils/ObjectUtils';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class JiraWidget extends AbstractWidget {

  static propTypes = {
  };

  static defaultProps = {
  };

  /**
   * Most of the time, Widget are linked to only one dataSource, so most of time
   * this function is enough.
   */
  getDS() {
    return this.props.dataSource[this.props.dataSource[0]];
  }

  getDSTimestamp() {
    return this.props.dataSource[this.props.dataSource[0]].timestamp;
  }

  isDataSourceAvailable() {
    //console.log("JIRA PROPS :", this.props);
    let k = this.props.dataSource[0].toString();
    let isAvailable = !ObjectUtils.isNullOrEmpty(this.props.dataSource[k]);
    return isAvailable;
  }

  extractDataSourceData() {
    let ds = this.getDS();
    return {
      total: ds.total,// JSONPath.query(ds, '$.total'),
      issuesKeys: ds.issuesKeys//JSONPath.query(ds, '$.issues[*].key')
    }
  }

  renderHeader() {
    return (
      <h1>
        <strong>{this.props.number}</strong>
        <span>{this.props.title}</span>
      </h1>
    )
  }

  renderContent() {
    if (!this.isDataSourceAvailable()) {
      console.log("DataSourceAvailable NOT available in JIRA WIDGET");
      return this.renderLoading();
    }
    let { total, issuesKeys } = this.extractDataSourceData();
    return (
      <div>
        <p>Total in TODO : {total}</p>
        <p>Issues in TODO : {issuesKeys}</p>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let result = {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
  return result;
};

export default connect(
  mapStateToProps
)(JiraWidget)

