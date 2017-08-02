
export default class ObjectUtils {

  /**
   * Return true the argument is null or empty
   */
  static isNullOrEmpty = (obj) => {
    return obj == null || Object.keys(obj).length == 0;
  };

}

