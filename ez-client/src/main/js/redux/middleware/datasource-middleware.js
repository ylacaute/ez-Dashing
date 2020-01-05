import { DatasourceEvent } from 'redux/event/datasource-event';

const datasourceMiddleware = dataSourceService => store => next => action => {

  if (action.type === DatasourceEvent.DataSourceRefreshed) {
    dataSourceService.onDataSourceRefreshed(action);
  }

  return next(action);
};

export default datasourceMiddleware;


