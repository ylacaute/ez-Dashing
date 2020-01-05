import Logger from "utils/logger";
import JsonUtils from "utils/json-utils";
import GridLayoutService from "service/grid/grid-layout-service";

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
  static extendsConfig(dashboardConfig, loadGrid = true) {
    const extendedCfg = Object.assign({}, dashboardConfig, {
      theme: dashboardConfig.theme || "default",
      thresholds: dashboardConfig.thresholds || {},
      avatars: dashboardConfig.avatars || {},
      env: !dashboardConfig.env ? {} :
        JsonUtils.replaceVars(dashboardConfig, dashboardConfig.env),
      widgets: ConfigExtender.extendsWidgetConfig(dashboardConfig)
    });
    if (loadGrid) {
      GridLayoutService.loadGridLayout(extendedCfg);
    }
    logger.info("Extended config:", extendedCfg);
    return extendedCfg;
  }

  static extendsWidgetConfig(dashboardConfig) {
    return dashboardConfig.widgets.map((widgetConfig, index) => {
      const id = widgetConfig.id || "wid_" + index;
      return Object.assign({}, widgetConfig, {
        id: id,
        key: id,
        avatars: widgetConfig.avatars || dashboardConfig.avatars,
        thresholds: widgetConfig.thresholds || dashboardConfig.thresholds,
        dataSource: widgetConfig.dataSource || [],
        className: widgetConfig.className || widgetConfig.type.toLowerCase().replace("widget", "")
      });
    });
  }

}
