import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class HelloWorldWidget extends AbstractWidget {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object
  };

  static defaultProps = {
  };

  renderContent() {
    return (
      <div>
        <h2>Hello world !</h2>
      </div>
    );
  }

  renderFooter() {
    return (
      <p>Footer</p>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};

export default connect(
  mapStateToProps
)(HelloWorldWidget)

