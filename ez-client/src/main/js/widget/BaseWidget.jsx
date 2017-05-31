import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class BaseWidget extends React.Component {

  componentDidMount() {
    var intervalId = setInterval(this.refreshData.bind(this), this.props.refreshEvery * 1000);
    this.setState({intervalId: intervalId});
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  refreshData() {
  }

  renderLoadingContent() {
    return (
      <div className="spinner-content">
        <Spinner name='double-bounce' />
      </div>
    );
  }
}

BaseWidget.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  refreshEvery: PropTypes.number
};

BaseWidget.defaultProps = {
  refreshEvery: 60
};


export default BaseWidget;

