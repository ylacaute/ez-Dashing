import Logger from 'utils/Logger';
import { SetupEvent } from 'redux/event/SetupEvent';
import { GridEvent } from 'redux/event/GridEvent';

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

  console.log("FUCKING NEW GRID STATE:" , newState);
  return newState;
}
