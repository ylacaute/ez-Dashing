
const dataSourceMiddleware = dataSourceService => store => next => action => {

  // if (action.type === ) {
  //   dataSourceService.do...);
  // }

  return next(action);
};

export default dataSourceMiddleware;


