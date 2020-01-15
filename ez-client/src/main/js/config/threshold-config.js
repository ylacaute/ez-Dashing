export default class ThresholdConfig {

  /**
   * Return the property name matching the given value.
   * The given value is compared to the value of each property.
   * This first matched property is the property with the same value or less than the given one.
   *
   * If nothing match, return the "neutral"
   *
   * TODO: review that code, maybe explicit we want just a className threshold
   */
  static get = (thresholds, value) => {
    const prefix = "threshold-";

    if (thresholds != null) {
      for (let propertyName in thresholds) {
        if (isNaN(value)) {
          if (value === thresholds[propertyName]) {
            return prefix + propertyName;
          }
        } else {
          if (value >= thresholds[propertyName]) {
            return prefix + propertyName;
          }
        }
      }
    }
    return prefix + "neutral";
  };

}
