import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ObjectUtils from 'utils/ObjectUtils';
import ScalableImage from 'component/scalable/ScalableImage.jsx';

export default class AbstractWidget extends React.Component {

  static widgetClassName = 'widget';

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object,
    loaded: PropTypes.bool,
    onError: PropTypes.bool
  };

  static defaultProps = {
    loaded: false,
    onError: false
  };

  constructor(props) {
    super(props);
  }

  static mapCommonWidgetProps = (state, ownProps) => {
    let newDateSource = {
      ...ownProps.dataSource
    };
    ownProps.dataSource.forEach(dataSourceId => {
      newDateSource[dataSourceId] = state.dataSource[dataSourceId];
    });
    return {
      loaded: state.widget[ownProps.id].loaded,
      dataSource: newDateSource,
      sizeInfo: state.widget[ownProps.id].sizeInfo
    }
  };

  /**
   * Generate the widget CSS class names as a single string
   */
  getWidgetClassNames() {
    return classnames(
      AbstractWidget.widgetClassName,
      this.props.className,
      this.props.sizeInfo.wBreakpointClass,
      this.props.sizeInfo.hBreakpointClass);
  }

  /**
   * When a widget is on error, we need a independent template in order to not depend on some override methods.
   */
  renderError(error) {
    let title = 'Unknown widget';
    let name = 'Unknown error';
    let message = 'Pleas check your configuration';
    if (error != null) {
      if (error.name != null) name = error.name;
      if (error.message != null) message = error.message;
    }
    if (!ObjectUtils.isNullOrEmpty(this.props.title)) title = this.props.title;

    return (
      <section className={classnames(AbstractWidget.widgetClassName, 'error')}>
        <header>
          <h1>
            {title}
          </h1>
        </header>
        <article>
          <ScalableImage src="/img/error.png"/>

          <p>{name}</p>
          <p>{message}</p>
        </article>
      </section>
    );
  }

  /**
   * Display a nice spinner during the widget load
   */
  renderLoading() {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    );
  }

  /**
   * No widget content by default. Any widget has to override it.
   */
  renderContent() {
    console.log("[WARN] A Widget has not implemented the renderContent method");
    return null;
  }

  /**
   * Simple Header by default, with h1 tag
   */
  renderHeader() {
    return (
      <h1>{this.props.title}</h1>
    )
  }

  /**
   * A widget header have to be wrapped with a header tag
   */
  renderHeaderWrapper() {
    if (this.props.title == null) {
      return null;
    }
    return (
      <header>
        {this.renderHeader()}
      </header>
    )
  }

  /**
   * No footer by default
   */
  renderFooter() {
    return null;
  }

  /**
   * A widget footer have to be wrapped with a footer tag
   */
  renderFooterWrapper() {
    return (
      <footer>
        {this.renderFooter()}
      </footer>
    )
  }

  /**
   * Main render function, should not be override
   */
  render() {
    if (this.props.loaded != true)
      return this.renderLoading();
    if (this.props.onError == true)
      return this.renderError();
    try {
      return (
        <section className={this.getWidgetClassNames()}>
          {this.renderHeaderWrapper()}
          <article className="content">
            {this.renderContent()}
          </article>
          {this.renderFooterWrapper()}
        </section>
      );
    } catch (error) {
      return this.renderError(error);
    }
  }

}
