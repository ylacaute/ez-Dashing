import RestClient from 'client/RestClient';

export default class JiraClient {

  static doQuery = (query, callback, errorCallback) => {
    let path = "/api/jira/query?query=" + query;
    RestClient.get(path, (json) => {
      callback(json[0]);
    }, errorCallback);
  };

  static totalOfQuery = (query, callback, errorCallback) => {
    let path = "/api/jira/query/total?query=" + query;
    RestClient.get(path, (json) => {
      callback(json[0]);
    }, errorCallback);
  };

}
