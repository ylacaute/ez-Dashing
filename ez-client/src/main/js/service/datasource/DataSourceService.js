import RestClient from 'client/RestClient';

export const DataSourceEvent = {
  DataSourceRefreshed: 'DATASOURCE_REFRESHED'
};

export default class DataSourceService {

  static getDSKey(dsConfig, queryConfig) {
    return dsConfig.name + '#' + queryConfig.name;
  }

  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
  };

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  onClockTick(tickCount) {
    this.dashboardConfig.dataSources.forEach(dsConfig => {
      dsConfig.queries.forEach(queryConfig => {
        if (tickCount % queryConfig.refresh === 0) {
          this.refreshDataSourceQuery(dsConfig, queryConfig);
        }
      })
    });
  };

  getDataSourceServerPath() {
    let path = this.dashboardConfig.server.dataSourcePath;
    if (path.slice(-1) !== "/")
      path += "/";
    if (path.charAt(0) !== "/")
      path = "/" + path;
    return path;
  }

  refreshDataSourceQuery(dsConfig, queryConfig) {
    console.log('[INFO] Refreshing query \'' + queryConfig.name
      + '\' of dataSource \'' + dsConfig.name + '\'');
    const path = this.getDataSourceServerPath();

    RestClient.get(path + dsConfig.name + '/' + queryConfig.name, jsonResponse => {
      const keyDataSource = DataSourceService.getDSKey(dsConfig, queryConfig);
      this.dispatch({
        type: DataSourceEvent.DataSourceRefreshed,
        payload: {
          dsKey: keyDataSource,
          timestamp: new Date().getTime(),
          jsonData: jsonResponse
        }
      });
    }, error => {
      console.log('[ERROR] Unable to refresh dataSource, details:', error);
    });
  };

};

