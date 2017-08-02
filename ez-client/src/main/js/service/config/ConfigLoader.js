import RestClient from 'client/RestClient';
import ObjectUtils from 'utils/ObjectUtils.js';
import GridLayoutGenerator from 'service/config/GridLayoutGenerator';
import DataSourceFactory from 'service/config/DataSourceFactory';
import DataSource from 'service/dataSource/DataSource';
import WidgetComponentFactory from 'service/config/WidgetComponentFactory';

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

/**
 *
 */
export const ActionCreator = {
  jenkinsDataReceived : data => {
    return {
      type: ActionType.DataReceived,
      data: data
    }
  }
};

let createAllWidgets = fullConfig => {
  let widgetConfigs = fullConfig.widgets;
  return widgetConfigs.map((widgetConfig) => {
    if (widgetConfig.avatars === null) {
      widgetConfig.avatars = fullConfig.avatars;
    }
    if (widgetConfig.thresholds === null) {
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
      DataSourceFactory.create(jsonConfig.dataSources);
      this.dispatch({
        type: ActionType.ConfigLoadSuccess,
        config: {
          config: jsonConfig,
          configLoaded: true,
          widgets: createAllWidgets(jsonConfig),
        }
      });
    }), error => {
      console.log('[ERROR] Error during config loading, please verify your configuration, details:', error);
    })
  }

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

}

