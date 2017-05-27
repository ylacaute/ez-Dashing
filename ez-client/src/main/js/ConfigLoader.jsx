let http = require('http');

const CONFIG_FILE_NAME = 'config.json';

var headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');


class ConfigLoader {}

ConfigLoader.load = function(callback) {
  var url = window.location.origin + "/config.json";
  console.log("URL : " + url);

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: headers
  }).then(response => {
    return response.json();
  }).then(json => {
    console.log("config loaded : ", json);
    callback(json);
  }).catch(error => {
    console.log("Can't retrieve config.json file from server, details: ", error.message);
  });
};

export default ConfigLoader;
