import { createStore, combineReducers, applyMiddleware } from 'redux';

import LoggerMiddleware from 'redux/middleware/Logger';
import CrashReporterMiddleware from 'redux/middleware/CrashReporter';
import ClockMiddleware from 'redux/middleware/Clock';
import DataSourceMiddleware from 'redux/middleware/DataSourceMiddleware';

import { ClockService } from 'service/clock/ClockService';
import { JenkinsMonitoringService } from 'service/jenkins/JenkinsMonitoringService';
import logoClickCount from 'redux/reducer/Logo';

import ClockReducer from 'redux/reducer/ClockReducer';
import jenkinsMonitoring from 'redux/reducer/JenkinsMonitoring';
import StartupReducer from 'redux/reducer/StartupReducer';
import DataSourceReducer from 'redux/reducer/DataSourceReducer';
import WidgetReducer from 'redux/reducer/WidgetReducer';

import RestClient from 'client/RestClient';
import ObjectUtils from 'utils/ObjectUtils.js';
import GridLayoutGenerator from 'service/setup/GridLayoutGenerator';
import WidgetFactory from 'service/setup/WidgetFactory';
import DataSourceService from "service/datasource/DataSourceService";
import UUID from 'utils/UUID';
import StringUtils from 'utils/StringUtils';


export const SetupEvent = {
  ConfigLoadSuccess: 'CONFIG_LOAD_SUCCESS'
};

let counter = 1;

export default class SetupService {

  getServerConfigPath() {
    return '/api/dashboard/config';
  };

  /**
   * If the initial state depends on the configuration it can be initialized here
   */
  generateInitialState(dashboardConfig) {
    let initialState = {};
    initialState.widget = {};
    dashboardConfig.widgets.forEach(widgetConfig => {
      initialState.widget[widgetConfig.id] = {
        sizeInfo: {} // todo : move in config, and update config correctly in reducers
      };
    });
    console.log('[INFO] Initial application state initialized to', initialState);
    return initialState;
  };

  createReducers() {
    return combineReducers({
      startup: StartupReducer,
      widget: WidgetReducer,
      logoClickCount,
      clock: ClockReducer,
      jenkinsMonitoring,
      dataSource: DataSourceReducer,
    });
  };

  createMiddlewares(clockService, dataSourceService) {
    return applyMiddleware(
      //LoggerMiddleware,
      CrashReporterMiddleware,
      ClockMiddleware(clockService),
      DataSourceMiddleware(dataSourceService)
    );
  };

  /**
   * Load server dashboard configuration
   */
  getDashboardConfig(callback) {
    const path = this.getServerConfigPath();
    RestClient.get(path, callback, exception => {
      console.log('[FATAL] Error during application initialization, details:', exception);
    });
  };

  /**
   * Extends dashboard configuration.
   *
   * If no grid layout is set, generate a default one.
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
      //widgetConfig.loaded = true;
      widgetConfig.key = widgetConfig.id = UUID.random();
    });
    if (ObjectUtils.isNullOrEmpty(dashboardConfig.grid.layouts)) {
      dashboardConfig.grid.layouts = GridLayoutGenerator.generate(dashboardConfig);
      console.log('[INFO] Use auto-generated grid layout configuration');
    } else {
      console.log('[INFO] Use user grid layout configuration');
    }
  }

  /**
   * Generate React widget components
   */
  createAllWidgets(dashboardConfig) {
    return dashboardConfig.widgets.map((widgetConfig) => {
      return WidgetFactory.create(widgetConfig);
    });
  }

  /**
   * Application starting point
   */
  initialize(callback) {
    console.log("[INFO] Starting ez-Dashing...");

    this.getDashboardConfig(dashboardConfig => {
      this.extendsDashboardConfig(dashboardConfig);
      //console.log("[DEBUG] Extended config:", dashboardConfig);
      const clockService = new ClockService();
      const jenkinsMonitoringService = new JenkinsMonitoringService();
      const dataSourceService = new DataSourceService(dashboardConfig);

      const store = createStore(
        this.createReducers(),
        this.generateInitialState(dashboardConfig),
        this.createMiddlewares(clockService, dataSourceService)
      );

      jenkinsMonitoringService.setDispatch(store.dispatch);
      clockService.setDispatch(store.dispatch);
      dataSourceService.setDispatch(store.dispatch);

      store.dispatch({
        type: SetupEvent.ConfigLoadSuccess,
        dashboardConfig: dashboardConfig,
        widgetComponents: this.createAllWidgets(dashboardConfig)
      });

      clockService.start();
      console.log("[INFO] ez-Dashing ready !");
      callback(store);
    });
  }


}
