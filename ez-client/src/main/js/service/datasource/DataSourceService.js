import RestClient from "client/RestClient";
import JSONPath from "jsonpath";
import Logger from "logger/Logger";
import DataSourceFactory from 'service/datasource/DataSourceFactory';

const logger = Logger.getLogger("DataSourceService");

export const DataSourceEvent = {
  DataSourceRefreshed: "DATA_SOURCE_REFRESHED"
};

export default class DataSourceService {

  /**
   * Get the full loaded dashboard configuration as argument.
   * The created dataSources will be part of the state tree.
   */
  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
    this.dataSources = DataSourceFactory.create(dashboardConfig.dataSources);
    this.initializeResfreshTimers();
  };

  /**
   * Initialize timers for each dataSources in order to have an scheduled refresh.
   */
  initializeResfreshTimers() {
    this.timers = {};
    this.dataSources.forEach(ds => {
      this.timers[ds.id] = setInterval(() => {
        this.refreshDataSource(ds);
      }, ds.refresh * 1000);
    });
  }

  refreshDataSource(ds) {
    logger.info("Refreshing dataSource '{}'", ds.id);
    const path = this.getDataSourceServerPath();

    RestClient.get(path + ds.id, jsonResponse => {
      const widgetIdsListening = this.getWidgetIdsListening(ds.id);
      logger.trace("getWidgetIdsListening : " + widgetIdsListening);

      this.store.dispatch({
        type: DataSourceEvent.DataSourceRefreshed,
        dataSourceId: ds.id,
        widgetIdsListening: widgetIdsListening,
        payload: {
          ...this.getMappedProperties(ds, jsonResponse)
        }
      });
    }, error => {
      logger.error("Unable to refresh dataSource, details:", error);
    });
  };

  /**
   * Return dataSources (state tree)
   */
  getDataSources() {
    return this.dataSources;
  }

  /**
   * Set the redux store in order to emit events and read the current state
   */
  setStore(store) {
    this.store = store;
  }

  /**
   * Return the ids of widgets listening to the dataSource given in argument
   */
  getWidgetIdsListening(dataSourceId) {
    let result = [];
    this.dashboardConfig.widgets.forEach(widgetConfig => {
      if (widgetConfig.dataSource.includes(dataSourceId)) {
        result.push(widgetConfig.id);
      }
    });
    return result;
  }

  refreshAll() {
    this.dashboardConfig.dataSources.forEach(dsConfig => {
      dsConfig.queries.forEach(queryConfig => {
        this.refreshDataSource(dsConfig, queryConfig);
      })
    });
  }

  getDataSourceServerPath() {
    let path = this.dashboardConfig.server.dataSourcePath;
    if (path.slice(-1) !== "/")
      path += "/";
    if (path.charAt(0) !== "/")
      path = "/" + path;
    return path;
  }

  getMappedProperties(ds, jsonResponse) {
    const mapping = ds.mapping;
    if (mapping == null) {
      throw {
        name: "Invalid dataSource configuration",
        message: "You must define a mapping for query " + ds.id
      }
    }
    let result = {};
    for (let propertyName in mapping) {
      result[propertyName] = JSONPath.query(jsonResponse, mapping[propertyName]);
    }
    logger.trace("getMappedProperties for query '{}':", ds.id, result);
    return result;
  }

};

