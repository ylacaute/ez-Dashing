
//import { ActionType } from 'service/setup/SetupService';
import { SetupEvent } from 'service/setup/SetupService';

const initialState = {
  loaded: false
};

export default function configLoaderReducer(state = initialState, action) {
  switch (action.type) {
    case SetupEvent.ConfigLoadSuccess:
      console.log("[REDUCER] ConfigLoadSuccess:", action.config);
      return {
        loaded: true,
        config: action.config,
        widgets: action.widgets
      };
    default:
      return state
  }
}
