import React, { lazy, Suspense } from 'react';
import { bindActionCreators  } from 'redux';
import Widget from "component/widget/base/Widget";
import Logger from "utils/Logger";
import { WidgetEventCreator } from 'redux/event/WidgetEvent';
import { ModalEventCreator } from 'redux/event/ModalEvent';
import {connect} from "react-redux";

const logger = Logger.getLogger("WidgetFactory");

const mapStateToProps = (state, ownProps) => {
  return {
    ...Widget.mapCommonWidgetProps(state, ownProps)
  };
};

export default class WidgetFactory {

  static create = (widgetConfiguration, dispatch) => {
    const widgetEvents = bindActionCreators(WidgetEventCreator, dispatch);
    const modalEvents = bindActionCreators(ModalEventCreator, dispatch);
    const normalizedType = widgetConfiguration.type.toLowerCase().replace("widget", "");
    logger.debug("Creating component '{}'", normalizedType);
    const Component = lazy(() => import("component/widget/" + normalizedType));
    const props = {
      showModal: modalEvents.showModal,
      updateWidgetConfig: widgetEvents.updateWidgetConfig
    };
    const ConnectedComponent = connect(mapStateToProps)(Component);
    return (
        <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
          <Suspense fallback={<div>Loading...</div>}>
            <ConnectedComponent {...widgetConfiguration} {...props}/>
          </Suspense>
        </div>
    );
  };

  /**
   * Generate React widget components
   */
  static createAllWidgets(dashboardConfig, dispatch) {
    return dashboardConfig.widgets
      .filter(elt => elt.enabled !== false)
      .map((widgetConfig) => {
        return WidgetFactory.create(widgetConfig, dispatch);
      });
  }

}
