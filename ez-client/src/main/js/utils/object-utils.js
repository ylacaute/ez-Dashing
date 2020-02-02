import {map, isArray, isObject, isPlainObject, mapValues} from "lodash"

export default class ObjectUtils {

  /**
   * Return the type of an object as a simple string
   */
  static typeOf = (object) => {
    let text = Function.prototype.toString.call(object.constructor);
    return text.match(/function (.*)\(/)[1];
  };

  /**
   * Credits: https://github.com/Kikobeats/map-values-deep
   * Should be replaced by a native Lodash function
   * This function has been copied in order to bring some modifications in the future.
   */
  static mapValuesDeep(obj, fn, key) {
    return isArray(obj)
      ? map(obj, (innerObj, idx) => ObjectUtils.mapValuesDeep(innerObj, fn, idx))
      : isPlainObject(obj)
        ? mapValues(obj, (val, key) => ObjectUtils.mapValuesDeep(val, fn, key))
        : isObject(obj)
          ? obj
          : fn(obj, key)
  }

}

