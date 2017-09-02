import { createStore, combineReducers, applyMiddleware } from "redux";
import LoggerMiddleware from "redux/middleware/LoggerMiddleware";
import CrashReporterMiddleware from "redux/middleware/CrashReporter";
import DataSourceMiddleware from "redux/middleware/DataSourceMiddleware";
import GridMiddleware from "redux/middleware/GridMiddleware";
import ThemeMiddleware from "redux/middleware/ThemeMiddleware";
import StartupReducer from "redux/reducer/StartupReducer";
import DataSourceReducer from "redux/reducer/DataSourceReducer";
import WidgetReducer from "redux/reducer/WidgetReducer";
import GridReducer from "redux/reducer/GridReducer";
import RestClient from "utils/RestClient";
import WidgetFactory from "service/setup/WidgetFactory";
import DataSourceService from "service/datasource/DataSourceService";
import Logger from "utils/Logger";
import ConfigExtender from "service/setup/ConfigExtender";
import ThemeService from "service/theme/ThemeService";
import GridLayoutService from "service/grid/GridLayoutService";

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
      grid: GridReducer
    });
  };

  createMiddlewares(dataSourceService, gridLayoutService, themeService) {
    return applyMiddleware(
      LoggerMiddleware,
      CrashReporterMiddleware,
      DataSourceMiddleware(dataSourceService),
      GridMiddleware(gridLayoutService),
      ThemeMiddleware(themeService)
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
   * Application starting point
   */
  initialize(callback) {
    logger.info("Starting ez-Dashing...");

    this.getDashboardConfig(dashboardConfig => {
      const cfg = ConfigExtender.extendsConfig(dashboardConfig);
      const dataSourceService = new DataSourceService(cfg);
      const gridLayoutService = new GridLayoutService(cfg);
      const themeService = new ThemeService(cfg);
      const store = createStore(
        this.createReducers(),
        this.generateInitialState(cfg),
        this.createMiddlewares(dataSourceService, gridLayoutService, themeService)
      );
      gridLayoutService.setStore(store);
      dataSourceService.setStore(store);
      store.dispatch({
        type: SetupEvent.ConfigLoadSuccess,
        dataSources: dataSourceService.getDataSources(),
        dashboardConfig: cfg,
        widgetComponents: WidgetFactory.createAllWidgets(cfg)
      });
      themeService.loadTheme();
      callback(store);
    });
  }


}
