import Logger from "utils/Logger";
import ObjectUtils from "utils/ObjectUtils";
import GridLayoutGenerator from "service/setup/GridLayoutGenerator";

const logger = Logger.getLogger("GridLayoutService");

const LAYOUT_KEY = "EZ_LAYOUT_KEY_6";

export default class GridLayoutService {

  /**
   * Get the full loaded dashboard configuration as argument.
   */
  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
  };

  /**
   * Set the redux store in order to emit events and read the current state
   */
  setStore(store) {
    this.store = store;
  }

  resetLayout() {
    logger.info("Reset dashboard layout from localStorage and reload layout from configuration");
    //localStorage.clear();
    localStorage.removeItem(LAYOUT_KEY);
    location.reload(true);
  }

  onGridLayoutChange(action) {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(action.payload.allLayouts));
  }

  /**
   * Try to load the grid layout configuration in this order:
   *  - from local storage first
   *  - from the dashboard.json configuration file then
   *  - finally, we generate one if no configuration is available
   */
  static loadGridLayout(dashboardConfig) {

    let layout = localStorage.getItem(LAYOUT_KEY);
    if (layout != null) {
      dashboardConfig.grid.layouts = JSON.parse(layout);
      logger.info("Use the grid layout defined in the local storage");
      return;
    }

    if (ObjectUtils.isNullOrEmpty(dashboardConfig.grid.layouts)) {
      dashboardConfig.grid.layouts = GridLayoutGenerator.generate(dashboardConfig);
      logger.info("Use auto-generated grid layout configuration", dashboardConfig.grid.layouts);
    } else {
      logger.info("Use the grid layout defined in the configuration file");
    }

  }

}
