import RestClient from "utils/rest-client";
import UrlUtils from "utils/url-utils";
import Logger from "utils/logger";
import JsonMapper from 'utils/json-mapper';
import TypeUtils from 'utils/type-utils';
import DatasourceFactory from 'service/datasource/datasource-factory';
import {DatasourceEvent} from 'redux/event/datasource-event';

const logger = Logger.getLogger("DataSourceService");


export default class DatasourceService {

  /**
   * Get the full loaded dashboard configuration as argument.
   * The created dataSources will be part of the state tree.
   */
  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
    this.dataSources = DatasourceFactory.create(dashboardConfig.dataSources);
    logger.debug("Application dataSources:", this.dataSources);
    this.initializeRefreshTimers();
  };

  /**
   * Return true if all the dataSources on which the widget depend are loaded,
   * return false otherwise.
   */
  static areAllDataSourcesLoaded(dataSources) {
    let loaded = true;
    dataSources.forEach(ds => {
      if (ds.loaded === false) {
        loaded = false;
      }
    });
    return loaded;
  }

  /**
   * Initialize timers for each datasources in order to have an scheduled refresh.
   */
  initializeRefreshTimers() {
    this.timers = {};
    this.dataSources.forEach(ds => {
      if (ds.dependencies.length === 0) {
        this.timers[ds.id] = setInterval(() => {
          this.refreshDataSource(ds);
        }, ds.refresh * 1000);
        setTimeout(() => this.refreshDataSource(ds), 500);
        //this.refreshDataSource(ds);// refresh at start
      } else {
        logger.debug("The dataSource {} has dependencies, waiting.", ds.id);
      }
    });
  }

  refreshDataSource(ds) {
    logger.info("Refreshing dataSource '{}'", ds.id);
    const path = this.getDataSourceServerPath() + ds.id;
    const queryParams = UrlUtils.serializeAsQueryParams(ds.queryParams);
    RestClient.get(path + queryParams, jsonResponse => {
      const result = {
        type: DatasourceEvent.DataSourceRefreshed,
        lastUpdate: new Date(),
        dataSourceId: ds.id,
        widgetIdsListening: this.getWidgetIdsListening(ds.id),
        payload: {
          ...this.mapProperties(ds, jsonResponse)
        }
      };
      logger.debug("Dispatching refreshed dataSource:", result);
      this.store.dispatch(result);
    }, error => {
      logger.error("Unable to refresh dataSource, details:", error);
      if (ds.defaultResponse != null) {
        logger.warn("Using defaultResponse of the dataSource. DON'T USE THIS IN PRODUCTION.");
        const result = {
          type: DatasourceEvent.DataSourceRefreshed,
          lastUpdate: new Date(),
          dataSourceId: ds.id,
          widgetIdsListening: this.getWidgetIdsListening(ds.id),
          payload: {
            sprintId: ds.defaultResponse.sprintId,
            sprintName: ds.defaultResponse.sprintName,
            sprintNumber: ds.defaultResponse.sprintNumber,
            sprintStartDate: TypeUtils.convert(ds.defaultResponse.sprintStartDate, "date"),
            sprintEndDate: TypeUtils.convert(ds.defaultResponse.sprintEndDate, "date")
          }
        };
        logger.debug("Dispatching refreshed dataSource:", result);
        this.store.dispatch(result);
      }

    });
  };

  mapProperties(ds, jsonResponse) {
    if (!ds.mapping) {
      throw {
        name: "Invalid dataSource configuration",
        message: "You must define a mapping for query " + ds.id
      }
    }
    let mappedProperties = JsonMapper.mapProperties(ds.mapping, jsonResponse);
    logger.trace("getMappedProperties for query '{}':", ds.id, mappedProperties);
    return mappedProperties;
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
    logger.trace("getWidgetIdsListening : " + result);
    return result;
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
   * For now only support ONE dependency.
   * When a dataSource is refreshed and this one is defined as a dependency as another dataSource, we take
   * listened params and transform them as queryParams to refresh the dependent dataSource.
   */
  onDataSourceRefreshed(action) {
    const dsRefreshedId = action.dataSourceId;

    this.dataSources.forEach(ds => {
      const dsDependency = ds.dependencies.find(d => d.dataSource === dsRefreshedId);
      if (dsDependency) {
        // We found a dataSource which contains a dependency equals to the refreshed dataSource
        ds.queryParams = {};
        dsDependency.params.forEach(param => ds.queryParams[param] = action.payload[param]);
        logger.debug("Refreshing the dataSource {} with a dependency, with params:",
          ds.id,
          ds.queryParams);
        this.refreshDataSource(ds);
      }
    });
  }

};

