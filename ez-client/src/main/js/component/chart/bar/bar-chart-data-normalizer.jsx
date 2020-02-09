export default class BarChartDataNormalizer {

  /**
   * TODO
   */
  static normalize(data) {
    let series;
    if (Array.isArray(data.series)) {
      series = BarChartDataNormalizer.normalizeArraySeries(data);
    } else {
      series = BarChartDataNormalizer.normalizeObjectSeries(data);
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