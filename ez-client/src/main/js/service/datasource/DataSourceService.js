import RestClient from "client/RestClient";
import JSONPath from "jsonpath";
import Logger from "logger/Logger";
import DataSourceFactory from 'service/datasource/DataSourceFactory';
import TypeUtils from 'utils/TypeUtils';

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
      this.refreshDataSource(ds);// refresh at start
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
        lastUpdate: new Date(),
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

  /**
   * We are mapping json result with the defined properties in the query configuration. Note that JSONPath
   * always return an array so we always take the first element of the given array, execpt if we really
   * want an array, we then have to precise it with '[]'.
   *
   * For example, in the query configuration we could have:
   *
   *   "mapping": {
   *      "inProgressTotal": "$.total",
   *      "inProgressIssuesKeys[]": "$.issues[*].key"
   *   }
   *
   * inProgressTotal is normal property: in take the first element of the returned array of JSONPath.
   * inProgressIssuesKeys[] is an array: we keep the array returned by JSONPath
   *
   */
  getMappedProperties(ds, jsonResponse) {
    const mapping = ds.mapping;
    if (mapping == null) {
      throw {
        name: "Invalid dataSource configuration",
        message: "You must define a mapping for query " + ds.id
      }
    }
    let result = {};
    let type, prop, jsonPathValue;

    for (let propertyName in mapping) {
      if (propertyName.indexOf(":") >= 0) {
        // A type is defined
        type = propertyName.split(":")[0];
        prop = propertyName.split(":")[1];
      } else {
        type = "string";
        prop = propertyName;
      }
      jsonPathValue = JSONPath.query(jsonResponse, mapping[propertyName]);
      if (type != "array") {
        jsonPathValue = TypeUtils.convert(jsonPathValue[0], type);
      }
      result[prop] = jsonPathValue;
    }
    logger.trace("getMappedProperties for query '{}':", ds.id, result);
    return result;
  }

};

