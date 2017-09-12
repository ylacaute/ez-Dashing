import Logger from "utils/Logger";
import RestClient from "utils/RestClient";
import StringUtils from "utils/StringUtils";
import { WidgetEvent } from "redux/event/WidgetEvent";
import Constants from "Constant";

const logger = Logger.getLogger("WidgetService");

export default class WidgetService {

  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
  };

  setStore(store) {
    this.store = store;
  }

  updateConfig(action) {
    logger.info("update widget id={}", action.widgetId);
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
        payload: exception.cause.message
      };
      logger.debug("Dispatching error on widget config update:", result);
      this.store.dispatch(result);
    });

  }

}
