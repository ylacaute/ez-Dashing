
let headers = new Headers();

headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

class RestClient {}

RestClient.get = function (path, callback, errorCallback) {
  let url = window.location.origin + path;
  fetch(url, {
    method: 'GET',
    headers: headers,
  }).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error => {
    if (errorCallback != null) {
      errorCallback(error);
    }
  });
};

RestClient.post = function (path, payload, callback, errorCallback) {
  let url = window.location.origin + path;
  fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  }).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error => {
    if (errorCallback != null) {
      errorCallback(error);
    }
  });
};

export default RestClient;
