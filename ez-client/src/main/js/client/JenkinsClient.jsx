import React from 'react';


//headers.append('Authorization' , 'Basic ' + btoa(username + ':' + password));
class JenkinsClient {}

var host = 'http://localhost:2222';
//var jobName = 'bc-gas-sys_-_Analyse_reccurente';
//var branchName = 'master';

var headers = new Headers();
headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

JenkinsClient.getBuildInfo = function (jobName, branchName, callback) {
  var url = host + "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
  console.log("JENKINS REQUEST : " + url);
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

export default JenkinsClient;

