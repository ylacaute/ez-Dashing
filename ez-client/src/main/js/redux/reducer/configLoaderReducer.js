
import { ActionType } from 'service/config/ConfigLoader';

const initialState = {};

export default function configLoaderReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.ConfigLoadSuccess:
      console.log("[REDUCER] ConfigLoadSuccess:", action.config);
      return action.config;
    default:
      return state
  }
}
