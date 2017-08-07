import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class ErrorWidget extends AbstractWidget {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object
  };

  static defaultProps = {
    onError: true
  };

  renderContent() {
    return (
      <div>
        <h2>This content will not be displayed because of the property onError</h2>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(
  mapStateToProps
)(ErrorWidget)

