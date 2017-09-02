import Logger from 'utils/Logger';
import { SetupEvent } from 'service/setup/SetupService';

const logger = Logger.getLogger("GridReducer");

const initialState = {
  grid: {}
};

export default function GridReducer(state = initialState, action) {
  switch (action.type) {

    case SetupEvent.ConfigLoadSuccess:
      return action.dashboardConfig.grid;

    default:
      return state
  }
}
