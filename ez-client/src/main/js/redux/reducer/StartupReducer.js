import Logger from 'logger/Logger';
import { SetupEvent } from 'service/setup/SetupService';

const logger = Logger.getLogger("StartupReducer");

const initialState = {
  loaded: false
};

export default function StartupReducer(state = initialState, action) {
  switch (action.type) {
    case SetupEvent.ConfigLoadSuccess:
      logger.debug("ConfigLoadSuccess, dashboardConfig:", action.dashboardConfig);
      return {
        loaded: true,
        dashboardConfig: action.dashboardConfig,
        widgetComponents: action.widgetComponents
      };
    default:
      return state
  }
}
