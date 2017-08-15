import Logger from 'logger/Logger';
import { SetupEvent } from 'service/setup/SetupService';

const logger = Logger.getLogger("StartupReducer");

const initialState = {
  loaded: false
};

/**
 * This reducer manage the 'startup' tree state part but it is pretty dump. The reducer just put in the state
 * tree some information that some components, like Grid, will be interested on.
 *
 * This event includes the loaded dashboard configuration which regroups information on everything: each reducer
 * have to listen this event and do what they need depending their concerns.
 *
 * This event also includes the react widget components themselves which must be injected into the Grid.
 */
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
