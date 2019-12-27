
export default class WidgetBreakpointConfig {

  static MOBILE = " mobile";
  static DESKTOP = " desktop";
  static WIDTH = "width-";
  static HEIGHT = "height-";

  static getWidthClass = (itemBreakpoints, value) => {
    let result;

    if (itemBreakpoints != null && itemBreakpoints.width != null) {
      let colBreakpoints = itemBreakpoints.width;
      for (let propertyName in colBreakpoints) {
        if (value >= colBreakpoints[propertyName]) {
          result = WidgetBreakpointConfig.WIDTH + propertyName;
          break;
        }
      }
    }
    if (result === (WidgetBreakpointConfig.WIDTH + "xxxs")) {
      result += WidgetBreakpointConfig.MOBILE;
    } else {
      result += WidgetBreakpointConfig.DESKTOP;
    }
    return result;
  };

  static getHeightClass = (itemBreakpoints, value) => {
    let result;

    if (itemBreakpoints != null && itemBreakpoints.height != null) {
      let rowBreakpoints = itemBreakpoints.height;
      for (let propertyName in rowBreakpoints) {
        if (value >= rowBreakpoints[propertyName]) {
          result = WidgetBreakpointConfig.HEIGHT + propertyName;
          break;
        }
      }
    }
    return result;
  };


}
