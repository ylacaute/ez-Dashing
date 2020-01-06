import {applyMiddleware, combineReducers, createStore} from "redux";
import LoggerMiddleware from "redux/middleware/logger-middleware";
import CrashReporterMiddleware from "redux/middleware/crash-reporter";
import DataSourceMiddleware from "redux/middleware/datasource-middleware";
import GridMiddleware from "redux/middleware/grid-middleware";
import ThemeMiddleware from "redux/middleware/theme-middleware";
import WidgetMiddleware from "redux/middleware/widget-middleware";
import StartupReducer from "redux/reducer/startup-reducer";
import DataSourceReducer from "redux/reducer/datasource-reducer";
import WidgetReducer from "redux/reducer/widget-reducer";
import ModalReducer from "redux/reducer/modal-reducer";
import GridReducer from "redux/reducer/grid-reducer";
import RestClient from "utils/rest-client";
import WidgetFactory from "service/setup/widget-factory";
import DatasourceService from "service/datasource/datasource-service";
import Logger from "utils/logger";
import ConfigExtender from "service/setup/config-extender";
import ThemeService from "service/theme/theme-service";
import GridLayoutService from "service/grid/grid-layout-service";
import WidgetService from "service/widget/widget-service";
import {SetupEvent} from "redux/event/setup-event";
import Constants from "constant";
import DateService from "service/date/date-service";
import TypeUtils from 'utils/type-utils';

const logger = Logger.getLogger("StartupService");

export default class SetupService {

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
      dataSources: DataSourceReducer,
      widget: WidgetReducer,
      grid: GridReducer,
      modal: ModalReducer
    });
  };

  createMiddlewares(dataSourceService, gridLayoutService, themeService, widgetService) {
    return applyMiddleware(
      LoggerMiddleware,
      CrashReporterMiddleware,
      DataSourceMiddleware(dataSourceService),
      GridMiddleware(gridLayoutService),
      ThemeMiddleware(themeService),
      WidgetMiddleware(widgetService)
    );
  };

  /**
   * Load server dashboard configuration
   */
  getDashboardConfig(callback) {
    RestClient.get(Constants.DASHBOARD_CONFIG_PATH, callback, exception => {
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
      const dataSourceService = new DatasourceService(cfg);
      const gridLayoutService = new GridLayoutService(cfg);
      const themeService = new ThemeService(cfg);
      const widgetService = new WidgetService(cfg);

      DateService.FIXED_DATE = TypeUtils.convert(cfg.server.now, "date");

      const store = createStore(
        this.createReducers(),
        this.generateInitialState(cfg),
        this.createMiddlewares(dataSourceService, gridLayoutService, themeService, widgetService)
      );
      gridLayoutService.setStore(store);
      dataSourceService.setStore(store);
      widgetService.setStore(store);
      store.dispatch({
        type: SetupEvent.ConfigLoadSuccess,
        dataSources: dataSourceService.getDataSources(),
        dashboardConfig: cfg,
        widgetComponents: WidgetFactory.createAllWidgets(cfg, store.dispatch)
      });
      themeService.loadTheme();
      callback(store);
    });
  }


}
