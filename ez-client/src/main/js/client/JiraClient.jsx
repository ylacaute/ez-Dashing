import RestClient from 'js/client/RestClient.jsx';

class JiraClient {}

JiraClient.getBugs = function (callback, errorCallback) {
  let url = "/api/jira/bugs";
  RestClient.get(url, callback, errorCallback);
};

export default JiraClient;
