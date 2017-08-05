
import { ClockActionType }  from 'service/clock/ClockService';

const dataSourceMiddleware = dataSourceService => store => next => action => {

  if (action.type === ClockActionType.ClockTick) {
    dataSourceService.onClockTick(action.tickCount);
  }

  return next(action);
};

export default dataSourceMiddleware;


