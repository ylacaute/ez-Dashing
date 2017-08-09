import RestClient from "client/RestClient";
import JSONPath from "jsonpath";
import Logger from "logger/Logger";

const logger = Logger.getLogger("DataSourceService");

export const DataSourceEvent = {
  DataSourceRefreshed: "DATA_SOURCE_REFRESHED"
};

export default class DataSourceService {

  static getDataSourceId(dsConfig, queryConfig) {
    return dsConfig.name + "#" + queryConfig.name;
  }

  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
  };

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  getWidgetIdsListening(dataSourceId) {
    let result = [];
    this.dashboardConfig.widgets.forEach(widgetConfig => {
      if (widgetConfig.dataSource.includes(dataSourceId)) {
        result.push(widgetConfig.id);
      }
    });
    return result;
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

