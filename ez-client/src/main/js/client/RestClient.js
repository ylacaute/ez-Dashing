import RestException from 'client/RestException';

let defaultHeaders = new Headers();
defaultHeaders.append('Accept', 'application/json');
defaultHeaders.append('Content-Type', 'application/json');


let parseJsonResponse = (response) => {
  try {
    return response.json();
  } catch (jsonError) {
    throw new RestException('Can\'t parse HTTP response as valid JSON', jsonError);
  }
};

let handlHTTPResponse = (response, options, path) => {
  //console.log('[RESPONSE', response.status + ']', options.verb, path);
  if (!response.ok) {
    if (response.status === 504) {
      throw new RestException('Unable to contact the API server, is your server started ?', response);
    } else if (response.status >= 500) {
      throw new RestException('Internal server error', response);
    } else {
      throw new RestException('Request error, please verify your request is correct', response);
    }
  }
  return response;
};

let handlHTTPError = (error, errorCallback) => {
  if (errorCallback != null) {
    errorCallback(error);
  } else {
    console.log('[ERROR] Uncaught error during HTTP response process, details:', error);
  }
};


let jsonFetch = (path, options, callback, errorCallback) => {
  //console.log('[REQUEST]', options.verb, path);
  let url = window.location.origin + path;
  fetch(url, {
    headers: defaultHeaders,
    ...options
  })
    .then((response) => handlHTTPResponse(response, options, path))
    .then(parseJsonResponse)
    .then(callback)
    .catch(error => handlHTTPError(error, errorCallback));
};


export default class RestClient {

  static get = (path, callback, errorCallback) => {
    let options = {
      verb: 'GET',
    };
    jsonFetch(path, options, callback, errorCallback);
  };

  static post = (path, payload, callback, errorCallback) => {
    let options = {
      verb: 'GET',
      body: JSON.stringify(payload)
    };
    jsonFetch(path, options, callback, errorCallback);
  };

}
