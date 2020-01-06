export default class ThresholdConfig {

  static get = (thresholds, value) => {
    if (thresholds != null) {
      for (let propertyName in thresholds) {
        if (value >= thresholds[propertyName]) {
          return propertyName;
        }
      }
    }
    return "";
  };

}
