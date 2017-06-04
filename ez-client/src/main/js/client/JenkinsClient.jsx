import RestClient from 'js/client/RestClient.jsx';

class JenkinsClient {}

JenkinsClient.getBuildInfo = function (jobName, branchName, callback, errorCallback) {
  let url = "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
  RestClient.get(url, callback, errorCallback);
};

JenkinsClient.getJenkinsInfo = function (callback, errorCallback) {
  let url = "/api/jenkins/info";
  RestClient.get(url, callback, errorCallback);
};

export default JenkinsClient;
