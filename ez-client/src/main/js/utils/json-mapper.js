import JSONPath from "jsonpath";
import TypeUtils from 'utils/type-utils';

/**
 * If the property contains ":" that means the type is explicitly set.
 * When the type is not set, we consider the type is string by default.
 */
function splitTypeAndName(propertyName) {
  const splitIdx = propertyName.indexOf(":");
  if (splitIdx >= 0) {
    return {
      propType: propertyName.substring(0, splitIdx),
      propName: propertyName.substring(splitIdx + 1)
    };
  }
  return {
    propType: "string",
    propName: propertyName
  }
}

/**
 * Map a JSONPath query string result to an object of type argument 'propType'.
 * Supported type: int, float, bool, date, array
 */
function mapSimpleType(propType, jsonPathQuery, jsonResponse) {
  let jsonPathValue = JSONPath.query(jsonResponse, jsonPathQuery);
  if (propType !== "array") {
    jsonPathValue = TypeUtils.convert(jsonPathValue[0], propType);
  }
  return jsonPathValue;
}

/**
 * Map a JSONPath query string result to an object depending on the given mappingDefinition.
 * The returned object will contains only properties defined in the mapping.
 * The mapping must contains jsonPath queries _relative_ to the currently build object
 */
function mapObject(mappingDefinition, json) {
  const { jsonPath, mapping } = mappingDefinition;
  const child = JSONPath.query(json, jsonPath)[0];

  return {
    ...JsonMapper.mapProperties(mapping, child)
  };
}

/**
 * Map a JSONPath query string result to an array depending on the given mappingDefinition.
 * The returned elements contained in the returned array will contains only properties defined in the mapping.
 * The mapping must contains jsonPath queries _relative_ to the currently build object
 */
function mapArray(mappingDefinition, json) {
  const { jsonPath, mapping } = mappingDefinition;
  const child = JSONPath.query(json, jsonPath)[0];

  return child.map(child => JsonMapper.mapProperties(mapping, child));
}

/**
 * Map a JSONPath query string result to an object of type argument 'propType'.
 * The result of the JSONPath is first filtered with the regexp defined in the mappingDefinition before being
 * converted.
 */
function mapRegexp(propType, mappingDefinition, json) {
  try {
    const {jsonPath, regexp, matchIndex} = mappingDefinition;
    const rawString = JSONPath.query(json, jsonPath)[0];
    const match = new RegExp(regexp, "g").exec(rawString);
    const matchingString = match[matchIndex];

    return TypeUtils.convert(matchingString, propType);

  } catch (e) {
    if (mappingDefinition.ignoreException) {
      return null;
    }
    throw e;
  }
}

export default class JsonMapper {

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
  static mapProperties(mapping, jsonResponse) {
    let result = {};
    for (let propertyName in mapping) {
      const { propType, propName } = splitTypeAndName(propertyName);
      const mappingDefinition  = mapping[propertyName];

      if (typeof mappingDefinition === "string") {
        result[propName] = mapSimpleType(propType, mappingDefinition, jsonResponse);
      } else {
        switch (propType) {
          case "array":
            result[propName] = mapArray(mappingDefinition, jsonResponse);
            break;
          case "object":
            result[propName] = mapObject(mappingDefinition, jsonResponse);
            break;
          case "regexp":
            const reProps = splitTypeAndName(propName);
            result[reProps.propName] = mapRegexp(reProps.propType, mappingDefinition, jsonResponse);
            break;
          default:
            throw {
              name: "Invalid mapping type",
              message: "If you define a complex mapping, the result type can only be 'object', 'array' or 'regexp'"
            }
        }
      }
    }
    return result;
  }

}


