import RestClient from 'js/client/RestClient.jsx';

class JiraClient {}

JiraClient.doQuery = function (query, callback, errorCallback) {
  let path = "/api/jira/query?query=" + query;
  RestClient.get(path, (json) => {
    callback(json[0]);
  }, errorCallback);
};

JiraClient.totalOfQuery = function (query, callback, errorCallback) {
  let path = "/api/jira/query/total?query=" + query;
  RestClient.get(path, (json) => {
    callback(json[0]);
  }, errorCallback);
};

export default JiraClient;
