
let headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

class RestClient {}

RestClient.get = function (path, callback) {
  let url = window.location.origin + path;
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error => {
    console.log("Error during http request : " + url + ", details: " + error);
  });
};

export default RestClient;
