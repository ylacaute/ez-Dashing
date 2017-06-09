import RestClient from 'js/client/RestClient.jsx';

class JenkinsClient {}

JenkinsClient.getBuildInfo = function (jobName, branchName, callback, errorCallback) {
  let url = "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
  RestClient.get(url, callback, errorCallback);
};

JenkinsClient.getMonitoring = function (callback, errorCallback) {
  let url = "/api/jenkins/monitoring";
  RestClient.get(url, callback, errorCallback);
};

export default JenkinsClient;
