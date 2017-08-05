import RestClient from 'client/RestClient';
import DataSourceActionType from 'datasource/DataSourceEvent';

const BASE_PATH = '/api/datasource/';

let createQueryRefreshTimer = (dsConfig, queryConfig, dispatch) => {
  console.log('[INFO] Initializing query \'' + queryConfig.name
    + '\' of dataSource \'' + dsConfig.name + '\''
    + '(refresh every ' + queryConfig.refresh + ' seconds)');

  const queryTimer = setInterval(() => {
    refreshQuery(dsConfig, queryConfig, dispatch);
  }, queryConfig.refresh * 1000);

  return queryTimer;
};

let refreshQuery = (dsConfig, queryConfig, dispatch) => {
  console.log('[INFO] Refreshing query \'' + queryConfig.name
    + '\' of dataSource \'' + dsConfig.name + '\'');

  RestClient.get(BASE_PATH + dsConfig.name + "/" + queryConfig.name, jsonResponse => {
    dispatch({
      type: DataSourceActionType.DataSourceRefreshed,
      dsName: dsConfig.name,
      dsQueryName: queryConfig.name,
      jsonData: jsonResponse
    });
  }, error => {
    console.log('[ERROR] Unable to refresh ... ,', error);
  });
};

/**
 * Each dataSource is composed of one or more queries. Each query
 * periodically generate a REST call depending the configuration.
 *
 * When a REST call is done, a Redux action is dispatched. The DataSourceReducer
 * will then transform
 *
 */
export default class DataSourceFactory {

  static create = (dsConfig, dispatch) => {
    console.log("[INFO] Creating data source:", dsConfig);

    if (dsConfig.queries.length === 0) {
      console.log("[WARN] No queries specified for dataSource ", dsConfig.name);
    }

    dsConfig.queries.forEach(queryConfig => {
      createQueryRefreshTimer(dsConfig, queryConfig, dispatch);
    });
  };

};


