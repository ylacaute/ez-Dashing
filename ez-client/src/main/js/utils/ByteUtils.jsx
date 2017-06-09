

class ByteUtils {
}

ByteUtils.asLabel = function (valueInMegaBytes) {
  if (valueInMegaBytes > 1000) {
    return parseInt(valueInMegaBytes / 1000) + " Go";
  }
  return valueInMegaBytes + " Mo";
};

export default ByteUtils;

