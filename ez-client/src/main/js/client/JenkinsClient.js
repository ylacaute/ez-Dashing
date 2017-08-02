import RestClient from 'client/RestClient';

export default class JenkinsClient {
  static getBuildInfo = (jobName, branchName, callback, errorCallback) => {
    let path = "/api/jenkins/lastBuild/" + jobName + "/" + branchName;
    RestClient.get(path, callback, errorCallback);
  };

  static getMonitoring = (callback, errorCallback) => {
    let path = "/api/jenkins/monitoring";
    RestClient.get(path, callback, errorCallback);
  };
}
