import RestClient from 'js/client/RestClient.jsx';

class JenkinsClient {}

JenkinsClient.getBuildInfo = function (jobName, branchName, callback) {
  let url = "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
  RestClient.get(url, callback);
};

JenkinsClient.getJenkinsInfo = function (callback) {
  let url = "/api/jenkins/info";
  RestClient.get(url, callback);
};

export default JenkinsClient;
