import Logger from "utils/Logger";
import RestClient from "utils/RestClient";
import StringUtils from "utils/StringUtils";
import { WidgetEvent } from "redux/event/WidgetEvent";
import Constants from "Constant";
import ConfigExtender from "service/setup/ConfigExtender";

const logger = Logger.getLogger("WidgetService");

export default class WidgetService {

  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
    this.timers = setInterval(() => {
      this.refreshAllWidgets();
    }, Constants.DASHBOARD_CONFIG_REFRESH * 1000);
  };

  setStore(store) {
    this.store = store;
  }

  updateConfig(action) {
    logger.info("update widget id={} with fields:", action.widgetId, action.payload);
    let path = StringUtils.format(Constants.UPDATE_WIDGET_PATH, action.widgetId);

    RestClient.patch(path, action.payload, () => {
      const result = {
        type: WidgetEvent.UpdateConfigSuccess,
        widgetId: action.widgetId,
        payload: action.payload
      };
      logger.debug("Dispatching updated widget config:", result);
      this.store.dispatch(result);

    }, exception => {
      logger.error("Error during widget update, details:", exception);
      const result = {
        type: WidgetEvent.UpdateConfigFailed,
        widgetId: action.widgetId,
        payload: exception.message
      };
      logger.debug("Dispatching error on widget config update:", result);
      this.store.dispatch(result);
    });

  }

  /**
   * Note that we remove dataSource because on the server side, dataSource are pure configuration, on
   * the client side, these dataSources became the real one (loaded). Only widgets properties have to be loaded
   * here, not the dataSources.
   */
  refreshAllWidgets() {
    logger.info("Refreshing dashboard configuration");

    RestClient.get(Constants.DASHBOARD_CONFIG_PATH, (dashboardConfig) => {
      const cfg = ConfigExtender.extendsConfig(dashboardConfig, false);
      cfg.widgets.forEach(w => delete w.dataSource);
      const result = {
        type: WidgetEvent.UpdateAll,
        payload: cfg.widgets,
      };
      logger.debug("Dispatching refreshed all widgets configuration:", result);
      this.store.dispatch(result);
    }, exception => {
      logger.error("Unable to refresh dashboard configuration, details:", exception);
    });
  };

}
