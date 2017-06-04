import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class RefreshableWidget extends React.Component {

  componentDidMount() {
    if (this.props.refreshEvery != null) {
      let intervalId = setInterval(this.refreshData.bind(this), this.props.refreshEvery * 1000);
      this.setState({intervalId: intervalId});
    }
    this.refreshData();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  refreshData() {
  }

  renderLoadingContent() {
    return (
      <div>
        <Spinner name='double-bounce' />
      </div>
    );
  }

}

RefreshableWidget.propTypes = {
  refreshEvery: PropTypes.number
};

export default RefreshableWidget;

