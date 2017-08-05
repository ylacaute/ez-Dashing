import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPath from 'jsonpath';
import Widget from 'component/widget/base/Widget.jsx';
import ObjectUtils from 'utils/ObjectUtils';


class JiraWidget extends React.Component {

  static propTypes = {
    displayName: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    displayName: 'Jira',
    className: 'jira'
  };

  constructor(props) {
    super(props);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!this.isDataSourceAvailable()) {
  //     return true;
  //   }
  //
  //   console.log("timestamp : ", this.getDSTimestamp());
  //   console.log("nextProps timestamp : ", nextProps.dataSource[nextProps.dataSource[0]].timestamp);
  //   return true;
  // }

  /**
   * Most of the time, Widget are linked to only one dataSource, so most of time
   * this function is enough.
   */
  getDS() {
    return this.props.dataSource[this.props.dataSource[0]].jsonData;
  }

  getDSTimestamp() {
    return this.props.dataSource[this.props.dataSource[0]].timestamp;
  }

  isDataSourceAvailable() {
    let k = this.props.dataSource[0].toString();
    let isAvailable = !ObjectUtils.isNullOrEmpty(this.props.dataSource[k]);
    return isAvailable;
  }

  extractDataSourceData() {
    let ds = this.getDS();
    return {
      total: JSONPath.query(ds, '$.total'),
      keys: JSONPath.query(ds, '$.issues[*].key')
    }
  }

  renderContent() {

    if (!this.isDataSourceAvailable()) {
      return (
        <div>
          <p>Waiting data...</p>
        </div>
      )
    }
    let { total, keys } = this.extractDataSourceData();
    return (
      <div>
        <p>Total in TODO : {total}</p>
        <p>Issues in TODO : {keys}</p>
      </div>
    )
  }

  render() {
    const { className, displayName} = this.props;
    return (
      <Widget
        className={className}
        title={displayName}
        content={this.renderContent()}
      />
    );
  }

}

const mapStateToProps = (state, ownProps) => {

  let result = {
    //clock: state.clock,
    ...Widget.mapDataSource(state, ownProps)
  };
  return result;
};

export default connect(
  mapStateToProps
)(JiraWidget)

