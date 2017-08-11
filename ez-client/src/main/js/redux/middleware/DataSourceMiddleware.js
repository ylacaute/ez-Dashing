import { SetupEvent } from 'service/setup/SetupService';

const dataSourceMiddleware = dataSourceService => store => next => action => {

  // if (action.type === SetupEvent.ConfigLoadSuccess) {
  //   dataSourceService.initialize(action);
  // }

  return next(action);
};

export default dataSourceMiddleware;


