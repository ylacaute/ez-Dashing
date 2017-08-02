import RestClient from 'client/RestClient';

export default class DataSource {




  static load = (dataSourceArray) => {
    if (dataSourceArray === null) {
      console.log("WARN: no dataSources defined in configuration.");
      return;
    }
    DataSources.sources = dataSourceArray;
    let dataSourceNames = DataSources.sources.map((d) => d.name);
    console.log("INFO: " + dataSourceNames + " DataSources loaded." );
  };

  static doGet = (dataSourceName, requestedPath, callback, errorCallback) => {
    const dataSource = DataSources.sources.find((d) => d.name === dataSourceName);
    if (dataSource === null) {
      errorCallback(new Error("No dataSource of name '" + dataSourceName + "'"));
    }
    const path = "/api/consumer/" + dataSource.name + "?query=" + requestedPath
      + "&baseUrl=" + dataSource.baseUrl
      + "&userName=" + dataSource.userName
      + "&password=" + dataSource.password;

    console.log("path : " + path);
    RestClient.get(path, callback, errorCallback);
  };

}
