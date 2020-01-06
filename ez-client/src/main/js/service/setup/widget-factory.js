import React, {lazy, Suspense} from 'react';
import {bindActionCreators} from 'redux';
import Widget from "component/widget/base/widget";
import {WidgetEventCreator} from 'redux/event/widget-event';
import {ModalEventCreator} from 'redux/event/modal-event';
import {connect} from "react-redux";
import WidgetErrorBoundary from "component/widget/base/widget-error-boundary";
import Logger from "utils/logger";

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
    logger.debug("Creating component '{}' with config: ", normalizedType, widgetConfiguration);
    const Component = lazy(() => new Promise((resolve, reject) => {
      import("component/widget/" + normalizedType)
        .then(result => resolve(result.default ? result : {default: result}))
        .catch(reject);
    }));
    const props = {
      showModal: modalEvents.showModal,
      updateWidgetConfig: widgetEvents.updateWidgetConfig
    };
    const ConnectedComponent = connect(mapStateToProps)(Component);

    return (
      <div id={widgetConfiguration.key} key={widgetConfiguration.key}>
        <WidgetErrorBoundary widgetConfiguration={widgetConfiguration}>
          <Suspense fallback={<div>Loading...</div>}>
            <ConnectedComponent {...widgetConfiguration} {...props}/>
          </Suspense>
        </WidgetErrorBoundary>
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
