import RestClient from "client/RestClient";
import JSONPath from "jsonpath";
import Logger from "logger/Logger";

const logger = Logger.getLogger("DataSourceService");

export const DataSourceEvent = {
  DataSourceRefreshed: "DATA_SOURCE_REFRESHED"
};

export default class DataSourceService {

  /**
   * If no refresh has been specified in configuration for a dataSource query,
   * this default value is used, in seconds.
   */
  static DEFAULT_REFRESH = 60;

  static getDataSourceId(dsConfig, queryConfig) {
    return dsConfig.name + "#" + queryConfig.name;
  }

  /**
   * Get the full loaded dashboard configuration as argument
   */
  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
    this.initializeResfreshTimers();
  };

  /**
   * Set the redux dispatch in order to emit events
   */
  setDispatch(dispatch) {
    this.dispatch = dispatch;
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

  /**
   * Initialize timers for each dataSources queries in order to automatic refresh.
   * If no refresh has been specified in configuration, use the default one (60 seconds).
   */
  initializeResfreshTimers() {
    this.timers = {};

    this.dashboardConfig.dataSources.forEach(dsConfig => {
      dsConfig.queries.forEach(queryConfig => {
        let refresh = queryConfig.refresh || DataSourceService.DEFAULT_REFRESH;

        this.timers[queryConfig.name] = setInterval(() => {
          this.refreshDataSourceQuery(dsConfig, queryConfig)
        }, refresh * 1000);
      })
    });
  }

  refreshAll() {
    this.dashboardConfig.dataSources.forEach(dsConfig => {
      dsConfig.queries.forEach(queryConfig => {
        this.refreshDataSourceQuery(dsConfig, queryConfig);
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

  refreshDataSourceQuery(dsConfig, queryConfig) {
    logger.info("Refreshing query '{}' of dataSource '{}'", queryConfig.name, dsConfig.name);
    const path = this.getDataSourceServerPath();

    RestClient.get(path + dsConfig.name + "/" + queryConfig.name, jsonResponse => {
      const dataSourceId = DataSourceService.getDataSourceId(dsConfig, queryConfig);
      logger.trace("getWidgetIdsListening : " + this.getWidgetIdsListening(dataSourceId));
      this.dispatch({
        type: DataSourceEvent.DataSourceRefreshed,
        dataSourceId: dataSourceId,
        widgetIdsListening: this.getWidgetIdsListening(dataSourceId),
        payload: {
          ...this.getMappedProperties(queryConfig, jsonResponse)
        }
      });
    }, error => {
      logger.error("Unable to refresh dataSource, details:", error);
    });
  };

  getMappedProperties(queryConfig, jsonResponse) {
    if (queryConfig.mapping == null) {
      throw {
        name: "Invalid dataSource configuration",
        message: "You must define a mapping for query " + queryConfig.name
      }
    }
    const mapping = queryConfig.mapping;
    let result = {};
    for (let propertyName in mapping) {
      result[propertyName] = JSONPath.query(jsonResponse, mapping[propertyName]);
    }
    logger.trace("getMappedProperties for query '{}':", queryConfig.name, result);
    return result;
  }

};

