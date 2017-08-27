import Logger from "utils/Logger";
import UUID from "utils/UUID";
import ObjectUtils from "utils/ObjectUtils";
import JsonUtils from "utils/JsonUtils";
import GridLayoutGenerator from "service/setup/GridLayoutGenerator";

const logger = Logger.getLogger("ConfigExtender");

export default class ConfigExtender {

  /**
   * Extends dashboard configuration
   *
   * Replace, in all the configuration, all variables found in the env section by their value.
   *
   * If no theme is set, use the "default" theme.
   *
   * If no grid layout is set, generate a default one.
   * If no thresholds is set, generate an empty one. Same for avatars.
   *
   * If a widget doesn't override avatars configuration, the avatars configuration is taken from
   * the global scope. Same for thresholds.
   *
   * If a widget is not linked to any dataSources, property can be not set in configuration but
   * we then prefer to map it on an empty array.
   *
   * Generate a unique widget key (required for react-grid-layout)
   * Generate a unique id equals to the key.
   *
   * Can return a new instance of the configuration or a modified instance of the mutable arg, that means
   * you MUST use the returned object in all cases.
   */
  static extendsConfig(dashboardConfig) {
    if (dashboardConfig.env == null) {
      dashboardConfig.env = {};
    } else {
      dashboardConfig = JsonUtils.replaceVars(dashboardConfig, dashboardConfig.env);
    }
    if (dashboardConfig.theme == null) {
      dashboardConfig.theme = "default";
    }
    if (dashboardConfig.thresholds == null) {
      dashboardConfig.thresholds = {};
    }
    if (dashboardConfig.avatars == null) {
      dashboardConfig.avatars = {};
    }
    dashboardConfig.widgets.forEach(widgetConfig => {
      if (widgetConfig.avatars == null) {
        widgetConfig.avatars = dashboardConfig.avatars;
      }
      if (widgetConfig.thresholds == null) {
        widgetConfig.thresholds = dashboardConfig.thresholds;
      }
      if (widgetConfig.dataSource == null) {
        widgetConfig.dataSource = [];
      }
      if (widgetConfig.className == null) {
        widgetConfig.className = widgetConfig.type.toLowerCase().replace("widget", "");
      }
      widgetConfig.key = widgetConfig.id = UUID.random();
    });
    if (ObjectUtils.isNullOrEmpty(dashboardConfig.grid.layouts)) {
      dashboardConfig.grid.layouts = GridLayoutGenerator.generate(dashboardConfig);
      logger.info("Use auto-generated grid layout configuration");
    } else {
      logger.info("Use user grid layout configuration");
    }
    return dashboardConfig;
  }

}
