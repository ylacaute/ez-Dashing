
export default class UrlUtils {

  static serializeAsQueryParams(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    let result = str.join("&");
    if (result.length > 0) {
      result = "?" + result;
    }
    return result;
  }

}
