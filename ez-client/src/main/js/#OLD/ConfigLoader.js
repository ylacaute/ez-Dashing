import RestClient from 'utils/RestClient';
import ObjectUtils from 'utils/ObjectUtils.js';
import GridLayoutGenerator from 'service/config/GridLayoutGenerator';
import WidgetComponentFactory from 'service/config/WidgetComponentFactory';
//import DataSourceFactory from "datasource/DataSourceFactory";

/**
 * Default properties
 *   path : path of the application configuration
 */
const DEFAULT_PROPS = {
  path: '/api/dashboard/config'
};

/**
 * Actions dispatched by and only by ConfigLoader
 */
export const ActionType = {
  ConfigLoadSuccess: 'CONFIG_LOAD_SUCCESS',
  ConfigLoadFailure: 'CONFIG_LOAD_FAILURE'
};

let createAllWidgets = fullConfig => {
  let widgetConfigs = fullConfig.widgets;
  return widgetConfigs.map((widgetConfig) => {
    if (widgetConfig.avatars == null) {
      widgetConfig.avatars = fullConfig.avatars;
    }
    if (widgetConfig.thresholds == null) {
      widgetConfig.thresholds = fullConfig.thresholds;
    }
    return WidgetComponentFactory.create(widgetConfig);
  });
};

/**
 * This class load the application configuration. The configuration is mainly has a json structure excepted
 * for the widget part : values are Widget components dynamically constructed
 */
export class ConfigLoader {

  constructor(props = DEFAULT_PROPS) {
    this.props = Object.assign({}, DEFAULT_PROPS, props);
  }

  load() {
    RestClient.get(this.props.path, (jsonConfig => {
      if (ObjectUtils.isNullOrEmpty(jsonConfig.grid.layouts)) {
        jsonConfig.grid.layouts = GridLayoutGenerator.generate(jsonConfig);
      } else {
        console.log('[INFO] Use use grid layout configuration');
      }

      // jsonConfig.dataSources.forEach((ds) => {
      //   DataSourceFactory.create(ds, this.dispatch);
      // });

      this.dispatch({
        type: ActionType.ConfigLoadSuccess,
        config: jsonConfig,
        widgets: createAllWidgets(jsonConfig)
      });
    }), exception => {
      console.log('[FATAL] Error during config loading, details:', exception);
    })
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

}

