import RestClient from 'js/client/RestClient.jsx';

class SonarClient {}

SonarClient.getSummaryInfos = function (projectKey, callback) {
  let path = "/api/sonar/summary?projectKey=" + encodeURIComponent(projectKey);
  RestClient.get(path, callback);
};

export default SonarClient;

