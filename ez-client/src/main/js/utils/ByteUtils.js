

export default class ByteUtils {

  /**
   * Generate a readable label of a value in MBytes
   */
  static asLabel = (valueInMegaBytes) => {
    if (valueInMegaBytes > 1000) {
      return parseFloat(valueInMegaBytes / 1000.0) + " Go";
    }
    return valueInMegaBytes + " Mo";
  };

}
