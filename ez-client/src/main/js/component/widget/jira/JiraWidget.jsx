import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class JiraWidget extends AbstractWidget {

  /**
   *  issuesKeys and total are array because JSONPath always return arrays. As those data come from
   *  a generic dataSource system, only the Widget can know the real nature of those data.
   *  Each widget has to live with that !.
   */
  static propTypes = {
    dataReceivedAtLeastOne: PropTypes.bool,
    issuesKeys: PropTypes.array,
    total: PropTypes.array
  };

  static defaultProps = {
    dataReceivedAtLeastOne: false,
    issuesKeys: [],
    total: []
  };

  renderHeader() {
    return (
      <h1>
        <strong>{this.props.number}</strong>
        <span>{this.props.title}</span>
      </h1>
    )
  }

  renderContent() {
    const { total, issuesKeys, dataReceivedAtLeastOne } = this.props;
    if (!dataReceivedAtLeastOne) {
      return this.renderLoading();
    }
    return (
      <div>
        <p>Total in TODO : {total[0]}</p>
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

