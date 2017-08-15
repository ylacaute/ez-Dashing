
export default class TypeUtils {

  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  static isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  static isFloat(n){
    return Number(n) === n && n % 1 !== 0;
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
