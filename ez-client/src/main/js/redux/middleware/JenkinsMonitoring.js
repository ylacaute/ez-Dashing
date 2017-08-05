
import { ClockActionType }  from 'service/clock/ClockService.js';

const JenkinsMiddleware = jenkinsService => store => next => action => {
  if (action.type === ClockActionType.ClockTick) {
    jenkinsService.onTick(action.tickCount);
  }
  return next(action);
};

export default JenkinsMiddleware;


