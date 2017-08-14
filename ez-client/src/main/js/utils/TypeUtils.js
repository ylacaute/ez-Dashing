
export default class TypeUtils {

  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static convert = (stringValue, typeAsString) => {
    let result = stringValue;
    switch (typeAsString) {
      case "string":
        break;
      case "bool":
      case "boolean":
        result = stringValue == "true";
        break;
      case "int":
      case "integer":
        result = parseInt(stringValue);
        break;
      case "float":
        result = parseFloat(stringValue);
        break;
      case "array":
        result = Array.from(stringValue);
        break;
      default:
        throw "Unsupported type exception: '" + stringValue + "'";
    }
    return result;
  };
}
