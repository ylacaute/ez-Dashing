import Logger from 'utils/logger';
import { SetupEvent } from 'redux/event/setup-event';
import { GridEvent } from 'redux/event/grid-event';

const logger = Logger.getLogger("GridReducer");

const initialState = {
};

export default function GridReducer(state = initialState, action) {
  let newState;

  switch (action.type) {

    case SetupEvent.ConfigLoadSuccess:
      newState = action.dashboardConfig.grid;
      break;

    case GridEvent.LayoutChange:
      newState = {
        ...state,
        layout: action.payload.currentLayout,
        layouts: action.payload.allLayouts
      };
      break;

    default:
      return state
  }

  return newState;
}
