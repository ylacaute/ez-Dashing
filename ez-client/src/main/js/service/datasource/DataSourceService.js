import RestClient from "utils/RestClient";
import URLUtils from "utils/URLUtils";
import Logger from "utils/Logger";
import JsonMapper from 'utils//JsonMapper';
import TypeUtils from 'utils//TypeUtils';
import DataSourceFactory from 'service/datasource/DataSourceFactory';
import { DataSourceEvent } from 'redux/event/DataSourceEvent';

const logger = Logger.getLogger("DataSourceService");


export default class DataSourceService {

  /**
   * Get the full loaded dashboard configuration as argument.
   * The created dataSources will be part of the state tree.
   */
  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
    this.dataSources = DataSourceFactory.create(dashboardConfig.dataSources);
    logger.debug("Aoplication dataSources:", this.dataSources);
    this.initializeResfreshTimers();
  };

  /**
   * Initialize timers for each dataSources in order to have an scheduled refresh.
   */
  initializeResfreshTimers() {
    this.timers = {};
    this.dataSources.forEach(ds => {
      if (ds.dependencies == 0) {
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
    const queryParams = URLUtils.serializeAsQueryParams(ds.queryParams);
    RestClient.get(path + queryParams, jsonResponse => {
      const result = {
        type: DataSourceEvent.DataSourceRefreshed,
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
          type: DataSourceEvent.DataSourceRefreshed,
          lastUpdate: new Date(),
          dataSourceId: ds.id,
          widgetIdsListening: this.getWidgetIdsListening(ds.id),
          payload: {
            sprintId : ds.defaultResponse.sprintId,
            sprintName : ds.defaultResponse.sprintName,
            sprintNumber : ds.defaultResponse.sprintNumber,
            sprintStartDate : TypeUtils.convert(ds.defaultResponse.sprintStartDate, "date"),
            sprintEndDate : TypeUtils.convert(ds.defaultResponse.sprintEndDate, "date")
          }
        };
        logger.debug("Dispatching refreshed dataSource:", result);
        this.store.dispatch(result);
      }

    });
  };

  mapProperties(ds, jsonResponse) {
    if (ds.mapping == null) {
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
      const dsDenpendency = ds.dependencies.find(d => d.dataSource == dsRefreshedId);
      if (dsDenpendency == null) {
        return
      }
      // We found a dataSource which contains a dependency equals to the refreshed dataSource
      ds.queryParams = {};
      dsDenpendency.params.forEach(param => ds.queryParams[param] = action.payload[param]);
      logger.debug("Refreshing the dataSource {} with a dependency, with params:", ds.id, ds.queryParams);
      this.refreshDataSource(ds);
    });
  }

};

