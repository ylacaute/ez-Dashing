
//import { ActionType } from 'service/setup/SetupService';
import { SetupEvent } from 'service/setup/SetupService';

const initialState = {
  loaded: false
};

export default function StartupReducer(state = initialState, action) {
  switch (action.type) {
    case SetupEvent.ConfigLoadSuccess:
      console.log("[REDUCER] ConfigLoadSuccess:", action.dashboardConfig);
      return {
        loaded: true,
        dashboardConfig: action.dashboardConfig,
        widgetComponents: action.widgetComponents
      };
    default:
      return state
  }
}
