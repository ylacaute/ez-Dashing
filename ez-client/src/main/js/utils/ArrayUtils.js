
export default class ArrayUtils {

  static lasts = (array, count) => {
    if (count <= 0) {
      return [];
    }
    //let sliceIdx =
    return array.slice(Math.max(array.length - count, 0))
  };

}
