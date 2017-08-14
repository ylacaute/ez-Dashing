
/**
 * This factory create dataSources from a configuration. Indeed, the configuration has a user friendly format
 * and in the application, dataSources represent a state tree where each queries in the configuration is
 * translated to one DataSource.
 *
 * One dataSource with two queries in the configuration will generate two dataSources in the state tree.
 *
 * Please not that DataSource are NOT components: they are pure properties.
 */
export default class DataSourceFactory {

  /**
   * If no refresh has been specified in configuration for a dataSource query,
   * this default value is used, in seconds.
   */
  static DEFAULT_REFRESH = 60;

  /**
   * Create all dataSources. These dataSources are initialized as NOT loaded: a dataSource is loaded when
   * she has retrieve at least one data from server.
   */
  static create(dataSourceConfigs) {
    let dataSources = [];

    dataSourceConfigs.forEach(dsConfig => {
      dsConfig.queries.forEach(queryConfig => {
        dataSources.push({
          loaded: false,
          id: queryConfig.id,
          baseUrl: dsConfig.baseUrl,
          credentials: dsConfig.credentials,
          path: queryConfig.path,
          refresh: queryConfig.refresh || dsConfig.refresh || DataSourceFactory.DEFAULT_REFRESH,
          mapping: queryConfig.mapping || dsConfig.mapping || {}
        })
      })
    });

    return dataSources;
  }


}
