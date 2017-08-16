import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ObjectUtils from 'utils/ObjectUtils';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import Logger from 'logger/Logger';

const logger = Logger.getLogger("AbstractWidget");

export default class AbstractWidget extends React.Component {

  static widgetClassName = 'widget';

  static propTypes = {
    loaded: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object
  };

  static defaultProps = {
    loaded: false,
    title: null,
    subTitle: null,
    className: "",
    sizeInfo: {},
  };

  /**
   * All widgets MUST call this function in order to retrieve from the new redux state all common
   * widgets properties.
   */
  static mapCommonWidgetProps = (state, ownProps) => {
    return {
      ...state.widget[ownProps.id]
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  /**
   * Introduced in React v16: we can know nicely catch a rendering exception.
   * When an exception occurs in rendering, we set the widget in an error state which will
   * trigger a new rendering in safe-mode (see renderError).
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }


  /**
   * Return true if all the dataSources on the widget depend are loaded, return false otherwise.
   */
  isDataSourcesLoaded() {
    let loaded = true;
    this.props.dataSource.forEach(ds => {
      if (ds.loaded === false) {
        loaded = false;
      }
    });
    return loaded;
  }

  /**
   * Generate the widget CSS class names as an array. Using an array ease the overrides of this method by calling a
   * concat on super.getWidgetClassNames(). Also thanks to the module 'classnames' which accept arrays as argument
   * to generate the final CSS class string.
   */
  getWidgetClassNames() {
    return [
      AbstractWidget.widgetClassName,
      this.props.className,
      this.props.sizeInfo.wBreakpointClass,
      this.props.sizeInfo.hBreakpointClass];
  }

  /**
   * Render method of a widget in error. This method must be safe and independent in order to be sure
   * to not generate another exception.
   */
  renderError(error) {
    let title = 'Unknown widget';
    let name = 'Unknown error';
    let message = 'Pleas check your configuration';
    if (error != null) {
      if (error.name != null) name = error.name;
      if (error.message != null) message = error.message;
    }
    if (!ObjectUtils.isNullOrEmpty(this.props.title))
      title = this.props.title;

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
    logger.warn("A Widget has not implemented the renderContent method");
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
    if (this.state.hasError == true)
      return this.renderError();
    if (this.props.loaded != true)
      return this.renderLoading();

    let content;
    if (!this.isDataSourcesLoaded()) {
      content = this.renderLoading();
    } else {
      content = this.renderContent();
    }

    return (
      <section className={classnames(this.getWidgetClassNames())}>
        {this.renderHeaderWrapper()}
        <article className="content">
          {content}
        </article>
        {this.renderFooterWrapper()}
      </section>
    );
  }

}
