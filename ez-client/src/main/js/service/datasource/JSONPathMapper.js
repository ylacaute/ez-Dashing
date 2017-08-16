import JSONPath from "jsonpath";
import TypeUtils from 'utils/TypeUtils';
import Logger from "utils/Logger";

const logger = Logger.getLogger("JSONPathMapper");

export default class JSONPathMapper {

  /**
   * We are mapping json result with the defined properties in the query configuration. Note that JSONPath
   * always return an array so we always take the first element of the given array, execpt if we really
   * want an array, we then have to precise it with '[]'.
   *
   * For example, in the query configuration we could have:
   *
   *   "mapping": {
   *      "inProgressTotal": "$.total",
   *      "inProgressIssuesKeys[]": "$.issues[*].key"
   *   }
   *
   * inProgressTotal is normal property: in take the first element of the returned array of JSONPath.
   * inProgressIssuesKeys[] is an array: we keep the array returned by JSONPath
   *
   */
  static mapProperties(ds, jsonResponse) {
    const mapping = ds.mapping;
    if (mapping == null) {
      throw {
        name: "Invalid dataSource configuration",
        message: "You must define a mapping for query " + ds.id
      }
    }
    let result = {};
    let type, prop, jsonPathValue;

    for (let propertyName in mapping) {
      if (propertyName.indexOf(":") >= 0) {
        // A type is defined
        type = propertyName.split(":")[0];
        prop = propertyName.split(":")[1];
      } else {
        type = "string";
        prop = propertyName;
      }
      jsonPathValue = JSONPath.query(jsonResponse, mapping[propertyName]);
      if (type != "array") {
        jsonPathValue = TypeUtils.convert(jsonPathValue[0], type);
      }
      result[prop] = jsonPathValue;
    }
    logger.trace("getMappedProperties for query '{}':", ds.id, result);
    return result;
  }


}
