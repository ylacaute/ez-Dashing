import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ObjectUtils from 'utils/ObjectUtils';
import DataSourceService from 'service/datasource/DataSourceService';
import ScalableImage from 'component/scalable/ScalableImage.jsx';
import CubeSpinnerLoader from "component/loader/CubeSpinnerLoader";
import Logger from 'utils/Logger';
import UUID from "utils/UUID";

const logger = Logger.getLogger("Widget");

export default class Widget extends React.Component {

  static WIDGET_CLASS_NAME = 'widget';

  static propTypes = {
    /**
     * Widget id, must be unique inside a given dashboard configuration. The id automatically generated
     * when loading the dashboard config but can be override.
     * If no id is given, a random UUID is generated.
     */
    id: PropTypes.string,
    /**
     * ClassName of the widget. The classname is automatically generated from the "type" field
     * in the dashboard configuration.
     */
    className: PropTypes.string,
    /**
     * Widget DataSources
     */
    dataSource: PropTypes.array,
    /**
     * If editable, an edit icon appears on the widget. When you defined a Widget as editable, you
     * have also to define the editModal property.
     */
    editable: PropTypes.bool,
    /**
     * When editable, this property is required. It defines the Component to show in modal window
     */
    editModal: PropTypes.func,
    /**
     * Represent the real content of the widget. It can be anything but Two object should be used here:
     * <code>WidgetHeader</code> and <code>WidgetContent</code> in order to have immediate result.
     */
    children: PropTypes.node,
    /**
     * Loader displayed inside the Widget content during loading. The Widget is loaded when
     * all its dataSources are loaded.
     */
    loader: PropTypes.node,
    /**
     * Technical properties for responsive breakpoint
     */
    sizeInfo: PropTypes.shape({
      wBreakpointClass: PropTypes.string,
      hBreakpointClass: PropTypes.string,
    }),
    /**
     * Technical properties: showModal is called when the user click on the edit icon. This function
     *
     * @param {modal} component - React's component to display in a windows modal
     * @returns {void}
     */
    showModal: PropTypes.func,
    /**
     * Technical properties for updating widgets
     */
    updateWidgetConfig: PropTypes.func,
  };

  static defaultProps = {
    id: UUID.random(),
    className: "",
    dataSource: [],
    editable: false,
    editModal: null,
    children: null,
    loader: <CubeSpinnerLoader/>,
    sizeInfo: {
      wBreakpointClass: "",
      hBreakpointClass: "",
    },
    showModal: () => {},
    updateWidgetConfig: () => {},
  };

  /**
   * All widgets MUST call this function in order to retrieve from the
   * new redux state all common widget properties.
   */
  static mapCommonWidgetProps(state, ownProps) {
    return {
      ...state.widget[ownProps.id]
    }
  };

  static getDerivedStateFromProps(props, state) {
    const loaded = DataSourceService.areAllDataSourcesLoaded(props.dataSource);
    logger.debug("Widget id={} loaded: {}", props.id, loaded);
    return {
      loaded: loaded
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loaded: false
    }
  }

  /**
   * Introduced in React v16: we can know nicely catch a rendering exception.
   * When an exception occurs in rendering, we set the widget in an error state which will
   * trigger a new rendering in safe-mode (see renderError).
   */
  componentDidCatch(error, info) {
    this.setState({hasError: true});
  }

  /**
   * Generate the widget CSS class names as an array. Using an array ease the overrides of
   * this method by calling a concat on super.getWidgetClassNames(). Also thanks to the
   * module 'classnames' which accept arrays as argument to generate the final CSS class string.
   */
  getWidgetClassNames() {
    return [
      Widget.WIDGET_CLASS_NAME,
      this.props.className,
      this.props.sizeInfo.wBreakpointClass,
      this.props.sizeInfo.hBreakpointClass];
  }

  handleEditClick() {
    const {id, editModal, showModal} = this.props;
    if (!editModal) {
      logger.error("The Widget id={} is mark as editable but the func editModal has not been defined.", id);
    } else {
      showModal(editModal());
    }
  }

  /**
   * Render method of a widget in error. This method must be safe and independent in order to be sure
   * to not generate another exception.
   */
  renderError(error) {
    let id = 'Unknown widget id';
    let name = 'Unknown error';
    let message = 'Please check your configuration';
    if (error != null) {
      if (error.name) name = error.name;
      if (error.message) message = error.message;
    } else if (this.props.error) {
      if (this.props.error.name) name = this.props.error.name;
      if (this.props.error.message) message = this.props.error.message;
    } else if (this.state.error) {
      if (this.state.error.name) name = this.state.error.name;
      if (this.state.error.message) message = this.state.error.message;
    }
    if (!ObjectUtils.isNullOrEmpty(this.props.id))
      id = this.props.id;

    return (
      <section className={classnames(Widget.WIDGET_CLASS_NAME, 'error')}>
        <header>
          <h1>
            Widget id: {id}
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
    const {loaded} = this.state;
    const {editable} = this.props;
    let content;

    if (this.state.hasError)
      return this.renderError();
    if (!loaded) {
      content = this.props.loader;
    } else {
      content = this.props.children;
    }

    return (
      <section className={classnames(this.getWidgetClassNames())}>
        {editable &&
          <span className="edit-icon" onClick={this.handleEditClick.bind(this)}/>
        }
        {content}
      </section>
    );
  }

}
