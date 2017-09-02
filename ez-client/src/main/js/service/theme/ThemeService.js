import Logger from "utils/Logger";

const logger = Logger.getLogger("ThemeService");

const THEME_KEY = "EZ_THEME_KEY";
const LINK_DOM_ID = "cssThemeDomId";

export default class ThemeService {

  constructor(dashboardConfig) {
    this.dashboardConfig = dashboardConfig;
  };

  resetTheme() {
    localStorage.removeItem(THEME_KEY);
    ThemeService.setTheme(this.dashboardConfig.theme);
  }

  /**
   * Load the application theme (startup). Try to load the theme in local storage, from
   * configuration otherwise.
   */
  loadTheme() {
    let themeName = localStorage.getItem(THEME_KEY);
    if (themeName != null) {
      logger.info("Use the theme defined in the local storage");
      ThemeService.setTheme(themeName);
    } else {
      logger.info("Use the theme defined in dashboard.json configuration");
      ThemeService.setTheme(this.dashboardConfig.theme);
    }
  }

  static setTheme(themeName) {
    logger.info("Set '{}' theme ", themeName);
    let linkDom = document.getElementById(LINK_DOM_ID);
    if (linkDom == null) {
      linkDom = document.createElement("link");
      linkDom.id = LINK_DOM_ID;
      linkDom.rel = "stylesheet";
      linkDom.type = "text/css";
      linkDom.href = "css/" + themeName + "Theme.css";
      document.getElementsByTagName("head")[0].appendChild(linkDom)
    } else {
      linkDom.href = "css/" + themeName + "Theme.css";
    }
    localStorage.setItem(THEME_KEY, themeName);
  }
}
