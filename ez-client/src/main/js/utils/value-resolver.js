import JSONPath from 'jsonpath';
import StringUtils from './string-utils';

export default class ValueResolver {

  /**
   * Create a resolver function and immediately resolve the given value
   */
  static resolve(value, props) {
    return ValueResolver.create(props)(value);
  }

  /**
   * Create a resolver function which resolve a given value by scanning the props tree.
   * The value can be a JsonPath expression or a variable or the direct name of a property. If
   * the value can't be resolved, the result is the given value.
   *
   * Samples:
   *   value: "$.foo.bar"
   *   result: props.foo.bar
   *
   *   value: "${foo}"
   *   result: props.foo
   *
   *   value: foo
   *   result: props[foo] (which should be props.foo)
   *
   *
   */
  static create(props) {
    return (value) => {
      if (typeof value === "number") {
        value = "" + value;
      } else if (typeof value === "number") {
        throw new Error("You can create valueResolver only with string, received: "
          + (typeof value));
      }
      if (!value) {
        return null;
      }
      const trimValue = value.trim();
      let resolvedContent;

      if (trimValue.startsWith("$.")) {
        resolvedContent = JSONPath.query(props, value);
        // if (Array.isArray(resolvedContent)) {
        //   resolvedContent = resolvedContent[0];
        // }
      } else if (trimValue.startsWith("$")) {
        resolvedContent = StringUtils.replaceVars(trimValue, props);
      } else {
        resolvedContent = props[trimValue];
      }
      if (!resolvedContent) {
        resolvedContent = trimValue;
      }
      return resolvedContent;
    }
  }



}


