import RestClient from 'js/client/RestClient.jsx';

class JenkinsClient {}

JenkinsClient.getBuildInfo = function (jobName, branchName, callback, errorCallback) {
  let path = "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
  RestClient.get(path, callback, errorCallback);
};

JenkinsClient.getMonitoring = function (callback, errorCallback) {
  let path = "/api/jenkins/monitoring";
  RestClient.get(path, callback, errorCallback);
};

export default JenkinsClient;
