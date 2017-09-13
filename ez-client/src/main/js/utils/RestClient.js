import Logger from "utils/Logger";
import RestException from "utils/RestException";

const logger = Logger.getLogger("RestClient");

let requestIdCounter = 0;

let defaultHeaders = new Headers();
defaultHeaders.append("Accept", "application/json");
defaultHeaders.append("Content-Type", "application/json");

let parseJsonResponse = response => {
  return response.json().then(jsonResponse => ({
    response: response,
    jsonResponse: jsonResponse
  })).catch(error => ({
    response: response,
    jsonResponse: {}
  }));
};

let handleHTTPResponse = (requestId, response, options, path, jsonResponse) => {
  logger.info("RESPONSE[id={}] {} - {} {}", requestId, response.status, options.method, path);
  if (!response.ok) {
    let message;
    if (response.status === 504) {
      message = "Unable to contact the API server, is your server started ?";
    } else if (response.status >= 500) {
      message = "Internal server error";
    } else if (jsonResponse.message != null) {
      message = jsonResponse.message;
    } else {
      message = response.statusText
    }
    throw new RestException(message, jsonResponse);
  }
  return jsonResponse;
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
  logger.info("REQUEST[id={}] - {}:", requestId, path, options);
  let url = window.location.origin + path;
  fetch(url, {
    headers: defaultHeaders,
    ...options
  })
    .then((response) => parseJsonResponse(response))
    .then(({response, jsonResponse}) => handleHTTPResponse(requestId, response, options, path, jsonResponse))
    .then(callback)
    .catch(error => handleHTTPError(error, errorCallback));
};


export default class RestClient {

  static get = (path, callback, errorCallback) => {
    let options = {
      method: "GET",
    };
    jsonFetch(path, options, callback, errorCallback);
  };

  static patch = (path, payload, callback, errorCallback) => {
    let options = {
      method: "PATCH",
      body: JSON.stringify(payload)
    };
    jsonFetch(path, options, callback, errorCallback);
  };

  static post = (path, payload, callback, errorCallback) => {
    let options = {
      method: "POST",
      body: JSON.stringify(payload)
    };
    jsonFetch(path, options, callback, errorCallback);
  };

  static put = (path, payload, callback, errorCallback) => {
    let options = {
      method: "PUT",
      body: JSON.stringify(payload)
    };
    jsonFetch(path, options, callback, errorCallback);
  };

}
