import { createStore, combineReducers, applyMiddleware } from "redux";
import LoggerMiddleware from "redux/middleware/LoggerMiddleware";
import CrashReporterMiddleware from "redux/middleware/CrashReporter";
import DataSourceMiddleware from "redux/middleware/DataSourceMiddleware";
import { JenkinsMonitoringService } from "service/jenkins/JenkinsMonitoringService";
import jenkinsMonitoring from "redux/reducer/JenkinsMonitoring";
import StartupReducer from "redux/reducer/StartupReducer";
import DataSourceReducer from "redux/reducer/DataSourceReducer";
import WidgetReducer from "redux/reducer/WidgetReducer";
import RestClient from "client/RestClient";
import ObjectUtils from "utils/ObjectUtils.js";
import GridLayoutGenerator from "service/setup/GridLayoutGenerator";
import WidgetFactory from "service/setup/WidgetFactory";
import DataSourceService from "service/datasource/DataSourceService";
import UUID from "utils/UUID";
import Logger from "logger/Logger";


const logger = Logger.getLogger("StartupService");

export const SetupEvent = {
  ConfigLoadSuccess: "CONFIG_LOAD_SUCCESS"
};

export default class SetupService {

  getServerConfigPath() {
    return "/api/dashboard/config";
  };

  /**
   * If the initial state depends on the configuration it can be initialized here
   */
  generateInitialState(dashboardConfig) {
    let initialState = {};
    initialState.widget = {};
    dashboardConfig.widgets.forEach(widgetConfig => {
      initialState.widget[widgetConfig.id] = {
        sizeInfo: {}
      };
    });
    logger.info("Initial application state initialized to ", initialState);
    return initialState;
  };

  createReducers() {
    return combineReducers({
      startup: StartupReducer,
      dataSource: DataSourceReducer,
      widget: WidgetReducer,
      jenkinsMonitoring
    });
  };

  createMiddlewares(dataSourceService) {
    return applyMiddleware(
      LoggerMiddleware,
      CrashReporterMiddleware,
      DataSourceMiddleware(dataSourceService)
    );
  };

  /**
   * Load server dashboard configuration
   */
  getDashboardConfig(callback) {
    const path = this.getServerConfigPath();
    RestClient.get(path, callback, exception => {
      logger.error("Error during application initialization, details:", exception);
    });
  };

  /**
   * Extends dashboard configuration.
   *
   * If no grid layout is set, generate a default one.
   * If no thresholds is set, generate an empty one. Same for avatars.
   *
   * If a widget doesn't override avatars configuration, the avatars configuration is taken from
   * the global scope. Same for thresholds.
   *
   * If a widget is not linked to any dataSources, property can be not set in configuration but
   * we then prefer to map it on an empty array.
   *
   * Generate a unique widget key (required for react-grid-layout)
   * Each Widget has an id equals to its key.
   */

  extendsDashboardConfig(dashboardConfig) {
    if (dashboardConfig.thresholds == null) {
      dashboardConfig.thresholds = {};
    }
    if (dashboardConfig.avatars == null) {
      dashboardConfig.avatars = {};
    }
    dashboardConfig.widgets.forEach(widgetConfig => {
      if (widgetConfig.avatars == null) {
        widgetConfig.avatars = dashboardConfig.avatars;
      }
      if (widgetConfig.thresholds == null) {
        widgetConfig.thresholds = dashboardConfig.thresholds;
      }
      if (widgetConfig.dataSource == null) {
        widgetConfig.dataSource = [];
      }
      if (widgetConfig.className == null) {
        widgetConfig.className = widgetConfig.type.toLowerCase().replace("widget", "");
      }
      widgetConfig.key = widgetConfig.id = UUID.random();
    });
    if (ObjectUtils.isNullOrEmpty(dashboardConfig.grid.layouts)) {
      dashboardConfig.grid.layouts = GridLayoutGenerator.generate(dashboardConfig);
      logger.info("Use auto-generated grid layout configuration");
    } else {
      logger.info("Use user grid layout configuration");
    }
  }

  /**
   * Generate React widget components
   */
  createAllWidgets(dashboardConfig) {
    return dashboardConfig.widgets
      .filter(elt => elt.enabled != false)
      .map((widgetConfig) => {
      return WidgetFactory.create(widgetConfig);
    });
  }

  /**
   * Application starting point
   */
  initialize(callback) {
    logger.info("Starting ez-Dashing...");

    this.getDashboardConfig(dashboardConfig => {
      this.extendsDashboardConfig(dashboardConfig);
      logger.info("Extended config:", dashboardConfig);

      const jenkinsMonitoringService = new JenkinsMonitoringService();
      const dataSourceService = new DataSourceService(dashboardConfig);
      const store = createStore(
        this.createReducers(),
        this.generateInitialState(dashboardConfig),
        this.createMiddlewares(dataSourceService)
      );

      jenkinsMonitoringService.setDispatch(store.dispatch);
      dataSourceService.setStore(store);
      store.dispatch({
        type: SetupEvent.ConfigLoadSuccess,
        dataSources: dataSourceService.getDataSources(),
        dashboardConfig: dashboardConfig,
        widgetComponents: this.createAllWidgets(dashboardConfig)
      });

      callback(store);
    });
  }


}
