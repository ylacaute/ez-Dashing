export default class ThresholdConfig {

  /**
   * Return the property name matching the given value.
   * The given value is compared to the value of each property.
   * This first matched property is the property with the same value or less than the given one.
   *
   * If nothing match, return the "neutral"
   *
   * When only one threshold is defined, it is applied automatically what ever is the value.
   *
   * TODO: review that code, maybe explicit we want just a className threshold
   */
  static get = (thresholds, value) => {
    const prefix = "threshold-";
    let result = prefix + "neutral";
    if (thresholds == null) {
      return result;
    }

    const keys = Object.keys(thresholds);
    for (let i = 0; i < keys.length; i++) {
      let threshold = keys[i];
      if (keys.length === 1) {
        result = prefix + threshold;
        break;
      }
      if (isNaN(value)) {
        if (value === thresholds[threshold]) {
          result = prefix + threshold;
          break;
        }
      } else {
        if (value >= thresholds[threshold]) {
          result = prefix + threshold;
          break;
        }
      }
    }
    return result;
  };

}
