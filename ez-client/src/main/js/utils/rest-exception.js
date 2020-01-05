import ObjectUtils from 'utils/object-utils';

export default class RestException {

  constructor(message, cause) {
    this.message = message;
    this.cause = cause;
  }

  getMessage() {
    if (ObjectUtils.typeOf(this.cause) === 'Response') {
      // Try to improve message format of Http error response
      return this.message + " [" + this.cause.status + ": " + this.cause.statusText + "]";
    } else {
      return this.message + ", caused by " + this.cause;
    }
  }

}
