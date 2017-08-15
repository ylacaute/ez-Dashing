
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

  static convert = (obj, typeAsString) => {
    let result;

    if (obj == null) {
      return null;
    }

    switch (typeAsString) {
      case "str":
      case "string":
        result = obj.toString();
        break;
      case "bool":
      case "boolean":
        result = (obj == true || obj == "true" || obj == "True");
        break;
      case "int":
      case "integer":
        result = parseInt(obj);
        break;
      case "float":
        result = parseFloat(obj);
        break;
      default:
        throw "Unsupported type exception: '" + obj + "'";
    }
    return result;
  };
}
