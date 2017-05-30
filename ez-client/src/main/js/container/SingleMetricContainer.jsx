import React from 'react';
import PropTypes from 'prop-types';

class SingleMetricContainer extends React.Component {

  render() {
    return (
      <div className={`${this.props.className} single-metric-container`}>
        {this.props.children}
      </div>
    );
  }
}

SingleMetricContainer.propTypes = {
  className: PropTypes.string
};

SingleMetricContainer.defaultProps = {
  className: '',
};

export default SingleMetricContainer;
