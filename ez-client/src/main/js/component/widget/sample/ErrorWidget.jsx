import React from 'react';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class ErrorWidget extends AbstractWidget {

  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    }
  }

  renderContent() {
    return (
      <div>
        <h2>This content will not be displayed because of its error state</h2>
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

