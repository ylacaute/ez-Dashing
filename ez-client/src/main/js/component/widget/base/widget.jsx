import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DatasourceService from 'service/datasource/datasource-service';
import CubeSpinnerLoader from "component/loader/cube-spinner";
import Uuid from "utils/uuid";
import WidgetError from "component/widget/error-widget";
import Logger from 'utils/logger';

import "./widget.scss";

const logger = Logger.getLogger("Widget");

export default class Widget extends React.PureComponent {

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
    id: Uuid.random(),
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

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loaded: false
    }
  }

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
    const loaded = DatasourceService.areAllDataSourcesLoaded(props.dataSource);
    logger.debug("Widget id={} loaded: {}", props.id, loaded);
    return {
      loaded: loaded
    }
  }

  /**
   * Introduced in React v16: we can know nicely catch a rendering exception.
   * When an exception occurs in rendering, we set the widget in an error state which will
   * trigger a new rendering in safe-mode (see renderError).
   */
  componentDidCatch(error, info) {
    logger.error("An error has been caught in the widgetId {}: ", this.props.id, error);
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
   * Main render function, should not be override
   */
  render() {
    const {loaded} = this.state;
    const {editable, children, loader} = this.props;
    const content = loaded ? children : loader;

    if (this.state.hasError) {
      return <WidgetError {...this.props} />;
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
