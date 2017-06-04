
class ThresholdConfig {
}

ThresholdConfig.get = (thresholds, value) => {
  if (thresholds != null) {
    for (let propertyName in thresholds) {
      if (value >= thresholds[propertyName]) {
        return propertyName;
      }
    }
  }
  return "undefined";
};

export default ThresholdConfig;
