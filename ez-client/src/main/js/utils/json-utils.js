import StringUtils from "utils/string-utils";

export default class JsonUtils {

  /**
   * Search in all the json object the variables given in args and replace
   * them by the associated value.
   *
   * The stringify/parse method is NOT optimized, don't use this function on very large object.
   * For small json, it has an insignificant performance overhead.
   *
   * Field property values but also property names are impacted.
   *
   * A new instance of a json object is returned.
   */
  static replaceVars(jsonObj, variables) {
    const jsonAsString = JSON.stringify(jsonObj);
    const jsonUpdated = StringUtils.replaceVars(jsonAsString, variables);
    return JSON.parse(jsonUpdated);
  }

}
