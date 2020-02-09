export default class PieChartDataNormalizer {

  /**
   * If the series is given as an object, we have to normalize it.
   * In this process, colors key are important and must be fully defined.
   *
   * First accepted input format, which is also the normalized output format in all cases
   *
   * colors: {
   *   Before: "#ddd",
   *   After: "#2268ae"
   * },
   * indexBy: "bugType",
   * series: [{
   *   bugType: "P1"
   *   Before: 110,
   *   After: 153
   * },{
   *   bugType: "P2"
   *   Before: 18
   *   After: 146
   * }]
   *
   *
   * Second accepted input format:
   *
   * colors: {
   *   Before: "#ddd",
   *   After: "#2268ae"
   * },
   * indexBy: "bugType",
   * series: {
   *   P1: [110, 153],
   *   P2: [18, 146]
   * }
   *
   * Third accepted input format:
   *
   * colors: {
   *   Before: "#ddd",
   *   After: "#2268ae"
   * },
   * indexBy: "bugType",
   * series: [{
   *   bugType: "P1",
   *   values: [110, 153]
   * },{
   *   bugType: "P2",
   *   values: [18, 146]
   * }]
   *
   *
   */
  static normalize(data) {
    let series;
    if (Array.isArray(data.series)) {
      series = PieChartDataNormalizer.normalizeArraySeries(data);
    } else {
      series = PieChartDataNormalizer.normalizeObjectSeries(data);
    }
    return {
      ...data,
      series
    };
  }

  static normalizeArraySeries(data) {
    return data.series.map((item) => {
      if (item.values != null) {
        const normalizedItem = {
          [data.indexBy]: item[data.indexBy]
        };
        Object
          .keys(data.colors)
          .forEach((colorKey, idx) => {
            normalizedItem[colorKey] = item.values[idx];
          });
        return normalizedItem;
      } else {
        return item;
      }
    });
  }

  static normalizeObjectSeries(data) {
    return Object
      .keys(data.series)
      .map(key => {
        const item = {
          [data.indexBy]: key
        };
        if (!Array.isArray(data.series[key])) {
          throw new Error("The data format of you BarChart is incorrect: your series items should be array");
        }
        Object
          .keys(data.colors)
          .forEach((colorKey, idx) => {
            item[colorKey] = data.series[key][idx];
          });
        return item;
      });
  }

}