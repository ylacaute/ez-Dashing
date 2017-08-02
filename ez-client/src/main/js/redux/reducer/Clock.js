
import { ActionType } from 'service/clock/ClockService';

const initialState = 0;

export default function clockReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.Tick:
      return action.tickCount;
    default:
      return state
  }
}
