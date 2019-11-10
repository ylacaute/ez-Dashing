import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ObjectUtils from 'utils/ObjectUtils';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import Logger from 'utils/Logger';
import CubeSpinnerLoader from "component/loader/CubeSpinnerLoader.jsx";

const logger = Logger.getLogger("Widget");

export default class Widget extends React.Component {

  static widgetClassName = 'widget';

  static propTypes = {
    className: PropTypes.string,
    loaded: PropTypes.bool,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    sizeInfo: PropTypes.object,
    editable: PropTypes.bool,
    createEditModal: PropTypes.func,
    showModal: PropTypes.func.isRequired,
    updateWidgetConfig: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    className: "",
    loaded: false,
    title: null,
    subTitle: null,
    sizeInfo: {},
    editable: false,
    createEditModal: null,
    updateWidgetConfig: null,
    children: null,
    loader: <CubeSpinnerLoader/>
  };

  /**
   * All widgets MUST call this function in order to retrieve from the
   * new redux state all common widgets properties.
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
   * Return true if all the dataSources on which the widget depend are loaded,
   * return false otherwise.
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
   * Generate the widget CSS class names as an array. Using an array ease the overrides of
   * this method by calling a concat on super.getWidgetClassNames(). Also thanks to the
   * module 'classnames' which accept arrays as argument to generate the final CSS class string.
   */
  getWidgetClassNames() {
    return [
      Widget.widgetClassName,
      this.props.className,
      this.props.sizeInfo.wBreakpointClass,
      this.props.sizeInfo.hBreakpointClass];
  }

  handleEditClick() {
    const { id, createEditModal, showModal} = this.props;
    if (createEditModal == null) {
      logger.error("The Widget id={} is mark as editable but the func createEditModal has not been defined.", id);
    } else {
      showModal(createEditModal());
    }
  }

  /**
   * Render method of a widget in error. This method must be safe and independent in order to be sure
   * to not generate another exception.
   */
  renderError(error) {
    let title = 'Unknown widget';
    let name = 'Unknown error';
    let message = 'Please check your configuration';
    if (error != null) {
      if (error.name != null) name = error.name;
      if (error.message != null) message = error.message;
    } else if (this.props.error != null) {
      if (this.props.error.name != null) name = this.props.error.name;
      if (this.props.error.message != null) message = this.props.error.message;
    } else if (this.state.error != null) {
      if (this.state.error.name != null) name = this.state.error.name;
      if (this.state.error.message != null) message = this.state.error.message;
    }
    if (!ObjectUtils.isNullOrEmpty(this.props.title))
      title = this.props.title;

    return (
      <section className={classnames(Widget.widgetClassName, 'error')}>
        <header>
          <h1>
            {title}
          </h1>
        </header>
        <article>
          <ScalableImage className="error-image"/>
          <p>{name}</p>
          <p>{message}</p>
        </article>
      </section>
    );
  }

  /**
   * Main render function, should not be override
   */
  render() {
    const { editable } = this.props;

    if (this.state.hasError == true)
      return this.renderError();
    if (this.props.loaded != true)
      return this.props.loader;

    let content;
    if (!this.isDataSourcesLoaded()) {
      content = this.props.loader;
    } else {
      content = this.props.children;
    }

    return (
      <section className={classnames(this.getWidgetClassNames())}>
        {editable &&
          <span className="edit-icon" onClick={this.handleEditClick.bind(this)} />
        }
        {content}
      </section>
    );
  }

}
