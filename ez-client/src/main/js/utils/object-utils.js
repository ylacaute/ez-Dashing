export default class ObjectUtils {

  /**
   * Return the type of an object as a simple string
   */
  static typeOf = (object) => {
    let text = Function.prototype.toString.call(object.constructor);
    return text.match(/function (.*)\(/)[1];
  };

}

