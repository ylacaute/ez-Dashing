

Reducers have the responsability of construct and update the application state tree.

This tree is composed as below, in json-like format for better understanding. This tree show an example of a single widget.


```
"statTree": {
  "startup": {
    "loaded" : true,
    "avatars": [],
    "dataSources": [],
    "grid": ...
    "server": ...
    "thresholds": ...
  },
  "dataSources" : [
    
  ],
  "widget": {
    "dataSource": [{ 
      "id" : "id",
      "loaded": false
    }],
    "widgetId1": {
      "loaded" : true,
      "sizeInfo": {
        wBreakpointClass: String
        hBreakpointClass: String
        width: offsetWidth: Number
        height: offsetHeight: Number
      },
      "dataSourceMappedKey1" : "dataSourceJsonPathValue1",
      "dataSourceMappedKey2" : "dataSourceJsonPathValue2"
    }
  }
}
```
