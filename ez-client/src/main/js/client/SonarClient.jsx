import React from 'react';

class SonarClient {}

var host = 'http://localhost:2222';
var headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

SonarClient.getSummaryInfos = function (projectKey, callback) {
  console.log(">>>>> " + projectKey);
  console.log(">>>>> " + encodeURIComponent(projectKey));
  console.log(">>>>> " + encodeURI(projectKey));
  var url = host + "/api/sonar/summary?projectKey=" + encodeURIComponent(projectKey);
  console.log("SONAR REQUEST : " + url);
  fetch(url, {
    method: 'GET',
    headers: headers
  }).then(response => {
    return response.json();
  }).then(json => {
    callback(json);
  }).catch(error => {
    console.log("Error during http request : ", url);
  });
};

export default SonarClient;

