export default class ArrayUtils {

  static toArray(element) {
    return Array.isArray(element) ? element : [element];
  }

  /**
   * Return the last count element of the given array
   */
  static lasts = (array, count) => {
    if (count <= 0) {
      return [];
    }
    return array.slice(Math.max(array.length - count, 0))
  };

  /**
   * Calculate the average value from a given value array. You can also precise on how
   * many last elements this average is calculated.
   * Return 0 if no element in the valuesArray, the calculated average otherwise.
   */
  static computeAverage(valuesArray, lastValuesCount = null) {
    let average = 0;

    if (!lastValuesCount) {
      lastValuesCount = valuesArray.length;
    }
    let lastValues = ArrayUtils.lasts(valuesArray, lastValuesCount);
    let sum = lastValues.reduce((sum, value) => sum + value, 0);
    if (lastValues.length !== 0) {
      average = Math.floor(sum / lastValues.length);
    }
    return average;
  }


  static splitToNArrays(inputArray, maxSize) {// 4e - 1
    debugger;
    if (!inputArray || inputArray.length === 0) {
      return [];
    }
    let result = [inputArray.slice(0, maxSize)];
    if (inputArray.length > maxSize) {
      result.concat([ArrayUtils.splitToNArrays(inputArray.slice(maxSize), maxSize)]);
    }
    return result;
  }
}
