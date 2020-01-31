export default class StringUtils {

  static capitalizeFirstLetter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  /**
   * Count the number of occurrences of a string in another string
   */
  static countSubString(input, strToCount) {
    if (!input || !strToCount) {
      return 0;
    }
    return (input.match(new RegExp(strToCount, 'g')) || []).length;
  }

  /**
   * Format a String with parameter. Each '{}' will be replaced by arguments.
   * Arguments can be given separately or within a single array argument.
   */
  static format = function () {
    if (arguments.length === 0) {
      return "";
    }
    let formatted = Array.prototype.shift.call(arguments);
    let arrayArgs;

    if (Array.isArray(arguments[0])) {
      arrayArgs = arguments[0];
    } else {
      arrayArgs = arguments;
    }

    for (let i = 0; i < arrayArgs.length; i++) {
      formatted = formatted.replace("{}", arrayArgs[i]);
    }
    return formatted;
  };

  /**
   * Replace variables in a string with their values.
   *
   * Sample : replaceVars("hello ${var}", {var : "world" }) will return hello world
   */
  static replaceVars(template, variables) {
    if (typeof template !== "string") {
      return template;
    }
    let regex = new RegExp('\\$\\{(' + Object.keys(variables).join('|') + ')\\}', 'g');
    return template.replace(regex, (m, $1) => variables[$1] == null ? m : variables[$1]);
  }

  /**
   * Measure the text width in pixel
   */
  static measureText(input, fontSizePixel) {
    let c = document.createElement("CANVAS");
    let ctx = c.getContext("2d");
    ctx.font = fontSizePixel + "px Arial";
    return ctx.measureText(input).width;
  }

  /**
   * 42000 become 42k
   */
  static formatKiloNumber(number) {
      if (isNaN(number) || number < 1000) {
        return number;
      }
      return (number / 1000.0) + "k";
  }

}


