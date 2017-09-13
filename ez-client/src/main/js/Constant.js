
export default class Constants {

  /**
   * Because some widgets are editable and can change the server configuration, we need to periodically
   * refresh the dashboard configuration, in seconds.
   */
  static DASHBOARD_CONFIG_REFRESH = 5;

  /**
   * If no refresh has been specified in configuration for a dataSource query,
   * this default value is used, in seconds.
   */
  static DEFAULT_DATA_SOURCE_REFRESH = 60;

  /**
   * Path to retrieve the dashboard configuration file.
   */
  static DASHBOARD_CONFIG_PATH = "/api/dashboard/config";

  /**
   * Path to update a widget in the server configuration file. This update is a PATCH and currently
   * only fields of type String can be updated.
   */
  static UPDATE_WIDGET_PATH = "/api/dashboard/config/widgets/{}";

}


