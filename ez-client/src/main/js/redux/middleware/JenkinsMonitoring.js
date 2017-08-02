
import { ActionType }  from 'service/clock/ClockService.js';

const JenkinsMiddleware = jenkinsService => store => next => action => {
  if (action.type === ActionType.Tick) {
    jenkinsService.onTick(action.tickCount);
  }
  return next(action);
};

export default JenkinsMiddleware;


