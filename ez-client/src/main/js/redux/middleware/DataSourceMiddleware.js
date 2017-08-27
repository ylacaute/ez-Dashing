import { DataSourceEvent } from 'service/datasource/DataSourceService';

const dataSourceMiddleware = dataSourceService => store => next => action => {

  if (action.type === DataSourceEvent.DataSourceRefreshed) {
    dataSourceService.onDataSourceRefreshed(action);
  }

  return next(action);
};

export default dataSourceMiddleware;


