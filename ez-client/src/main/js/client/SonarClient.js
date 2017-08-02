import RestClient from 'client/RestClient';

export default class SonarClient {

  static getSummaryInfos = (projectKey, callback, errorCallback) => {
    let path = "/api/sonar/summary?projectKey=" + encodeURIComponent(projectKey);
    RestClient.get(path, (json) => {
      callback(json[0]);
    }, errorCallback);
  };

}

