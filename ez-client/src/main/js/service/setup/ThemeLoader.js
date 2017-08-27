import Logger from "utils/Logger";

const logger = Logger.getLogger("ThemeLoader");

export default class ThemeLoader {

  static LINK_DOM_ID = "cssTheme";

  static setTheme(themeName) {
    let linkDom = document.getElementById(ThemeLoader.LINK_DOM_ID);
    if (linkDom == null) {
      linkDom = document.createElement("link");
      linkDom.id = ThemeLoader.LINK_DOM_ID;
      linkDom.rel = "stylesheet";
      linkDom.type = "text/css";
      linkDom.href = "css/" + themeName + "Theme.css";
      document.getElementsByTagName("head")[0].appendChild(linkDom)
    } else {
      linkDom.href = "css/" + themeName + "Theme.css";
    }
  }

}
