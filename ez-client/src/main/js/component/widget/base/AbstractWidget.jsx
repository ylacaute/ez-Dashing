import React from 'react';
import PropTypes from 'prop-types';

import Widget from 'component/widget/base/Widget.jsx';

//import Spinner from 'react-spinkit';
//import ScalableImage from 'core/ScalableImage.jsx';

export default class AbstractWidget extends React.Component {

  static propTypes = {
    loaded: PropTypes.bool
  };

  static defaultProps = {
    loaded: false
  };

  static mapCommonWidgetProps = (state, ownProps) => {
    let newDateSource = {
      ...ownProps.dataSource
    };
    ownProps.dataSource.forEach(dsKey => {
      newDateSource[dsKey] = state.dataSource[dsKey];
    });
    return {
      loaded: state.widget[ownProps.id].loaded,
      dataSource: newDateSource,
      sizeInfo: state.widget[ownProps.id].sizeInfo
    }
  };

  renderError(exception) {
    return (
      <div className="error">
        <ScalableImage imgUrl="/img/icon/error.png" />
        <p>{exception.name}</p>
        <p>{exception.message}</p>
      </div>
    );
  }

  //<Spinner name='double-bounce' />
  renderLoadingContent() {
    return (
      <div>
        <p>WAIT</p>
      </div>
    );
  }

  renderContent() {
    console.log("[WARN] A Widget have not implemented the renderContent method");
  }

  render() {
    let content = this.props.loaded ? this.renderContent() : this.renderLoadingContent();

    return (
      <Widget
        {...this.props}
        title={this.props.title}
        content={content}
      />
    );

    //return this.renderContent();
  }

}
