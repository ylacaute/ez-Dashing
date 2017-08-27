import Logger from "utils/Logger";
import RestException from "utils/RestException";

const logger = Logger.getLogger("RestClient");

let requestIdCounter = 0;

let defaultHeaders = new Headers();
defaultHeaders.append("Accept", "application/json");
defaultHeaders.append("Content-Type", "application/json");

let parseJsonResponse = (response) => {
  try {
    return response.json();
  } catch (jsonError) {
    throw new RestException("Can't parse HTTP response as valid JSON", jsonError);
  }
};

let handleHTTPResponse = (requestId, response, options, path) => {
  logger.debug("RESPONSE[id={}] {} - {} {}", requestId, response.status, options.verb, path);
  if (!response.ok) {
    if (response.status === 504) {
      throw new RestException("Unable to contact the API server, is your server started ?", response);
    } else if (response.status >= 500) {
      throw new RestException("Internal server error", response);
    } else {
      throw new RestException("Request error, please verify your request is correct", response);
    }
  }
  return response;
};

let handleHTTPError = (error, errorCallback) => {
  if (errorCallback != null) {
    errorCallback(error);
  } else {
    logger.error("Uncaught error during HTTP response process, details:", error);
  }
};

let jsonFetch = (path, options, callback, errorCallback) => {
  const requestId = ++requestIdCounter;
  logger.debug("REQUEST[id={}] - {} {}", requestId, options.verb, path);
  let url = window.location.origin + path;
  fetch(url, {
    headers: defaultHeaders,
    ...options
  })
    .then((response) => handleHTTPResponse(requestId, response, options, path))
    .then(parseJsonResponse)
    .then(callback)
    .catch(error => handleHTTPError(error, errorCallback));
};


export default class RestClient {

  static get = (path, callback, errorCallback) => {
    let options = {
      verb: "GET",
    };
    jsonFetch(path, options, callback, errorCallback);
  };

  static post = (path, payload, callback, errorCallback) => {
    let options = {
      verb: "GET",
      body: JSON.stringify(payload)
    };
    jsonFetch(path, options, callback, errorCallback);
  };

}
