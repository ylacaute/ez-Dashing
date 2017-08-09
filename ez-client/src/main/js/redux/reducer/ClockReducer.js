import Logger from 'logger/Logger';
import { ClockActionType } from 'service/clock/ClockService';

const logger = Logger.getLogger("ClockReducer");

const initialState = {
  date: new Date(),
  tickCount: 0
};

export default function ClockReducer(state = initialState, action) {
  switch (action.type) {

    case ClockActionType.ClockTick:
      logger.debug("ClockTick");
      return {
        date: action.date,
        tickCount: action.tickCount
      };

    default:
      return state
  }
}
