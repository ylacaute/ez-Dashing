import JSONPath from "jsonpath";
import { assert } from "chai";

describe("JsonPATH", () => {

  it("query() should return a specific element inside an array", () => {
    let sonarResponse = {
      "component": {
        "id": "systemA",
        "key": "systemA",
        "name": "201701poolobject",
        "qualifier": "TRK",
        "measures": [{
          "metric": "lines",
          "value": "128"
        }, {
          "metric": "coverage",
          "value": "0.0"
        }, {
          "metric": "violations",
          "value": "12"
        }]
      }
    };
    let result = JSONPath.query(sonarResponse, "$.component.measures[?(@.metric == 'lines')].value");
    assert.equal(result[0], 128);
  });

});

