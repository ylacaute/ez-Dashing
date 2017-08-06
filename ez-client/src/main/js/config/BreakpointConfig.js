
export default class WidgetBreakpointConfig {

  static getWidthClass = (itemBreakpoints, value) => {
    if (itemBreakpoints != null && itemBreakpoints.width != null) {
      let colBreakpoints = itemBreakpoints.width;
      for (let propertyName in colBreakpoints) {
        if (value >= colBreakpoints[propertyName]) {
          return 'width-' + propertyName;
        }
      }
    }
    return "undefined";
  };

  static getHeightClass = (itemBreakpoints, value) => {
    if (itemBreakpoints != null && itemBreakpoints.height != null) {
      let rowBreakpoints = itemBreakpoints.height;
      for (let propertyName in rowBreakpoints) {
        if (value >= rowBreakpoints[propertyName]) {
          return 'height-' + propertyName;
        }
      }
    }
    return "undefined";
  };


}
