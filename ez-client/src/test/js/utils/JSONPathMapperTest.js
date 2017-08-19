import JSONPathMapper from "utils/JSONPathMapper";
import { assert } from "chai";

describe("JSONPathMapper", () => {

  it("mapProperties() should map single string without specifying type", () => {
    let json = { field: "a string value" };
    let mapping = { "name": "$.field" };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.name, "a string value");
  });

  it("mapProperties() should map single string with specifying type", () => {
    let json = { field: "a string value" };
    let mapping = { "string:name": "$.field" };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.name, "a string value");
  });

  it("mapProperties() should map single int", () => {
    let json = { field: 42 };
    let mapping = { "int:name": "$.field" };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.name, 42);
  });

  it("mapProperties() should map single date", () => {
    let json = { date: "2017-07-12T17:28:03.000+0200" };
    let mapping = { "date:myDate": "$.date" };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(
      result.myDate.getTime(),
      new Date(2017, 6, 12, 17, 28, 3).getTime());
  });

  it("mapProperties() should map a regexp from a string", () => {
    // We first verify the regexp is ok
    let input = "something sprint=8,value=foobar";
    let regexp = /(.*)sprint=(.*),value(.*)/g;
    let match = regexp.exec(input);
    assert.equal(match[2], "8");

    let json = { field: input };
    let mapping = {
      "regexp:number" : {
        jsonPath: "$.field",
        regexp: "(.*)sprint=(.*),value(.*)",
        matchIndex: 2
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.number, "8");
  });

  it("mapProperties() should failed to map a regexp but ignore exception", () => {
    let json = { field: null };
    let mapping = {
      "regexp:number" : {
        jsonPath: "$.field",
        regexp: "(.*)sprint=(.*),value(.*)",
        matchIndex: 2,
        ignoreException: true
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.number, null);
  });

  it("mapProperties() should map a regexp taking the first element of returned array from JSONPath", () => {
    let json = { field: ["com....4c3[id=244...=CLOSED,name=Sprint 8 - AAA - R 2.19,startDate=2017-07...."] };
    let mapping = {
      "regexp:sprintNumber" : {
        jsonPath: "$.field",
        regexp: "(.*)name=Sprint[ ]([0-9])*[ ](.*)",
        matchIndex: 2,
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.sprintNumber, "8");
  });

  it("mapProperties() should map a regexp and use the specified type to convert the result", () => {
    let json = { field: "com....4c3[id=244...=CLOSED,name=Sprint 8 - AAA - R 2.19,startDate=2017-07...." };
    let mapping = {
      "regexp:sprintNumber" : {
        jsonPath: "$.field",
        regexp: "(.*)name=Sprint[ ]([0-9])*[ ](.*)",
        matchIndex: 2,
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.sprintNumber, 8);
  });

  it("mapProperties() should map array ignoring some fields", () => {
    let json = {
      field: 42,
      data: [{
        wantedProp: "Bob marley1",
        ignoredProp: "Word1"
      },{
        wantedProp: "Bob marley2",
        ignoredProp: "Word2"
      }]
    };
    let mapping = {
      "array:newData": {
        jsonPath : "$.data",
        mapping: {
          "string:name" : "$.wantedProp",
        }
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(result.newData.length, 2);
    assert.equal(Array.isArray(result.newData), true);
    assert.equal(result.newData[0].name, "Bob marley1");
    assert.equal(result.newData[0].wantedProp, null);
    assert.equal(result.newData[0].ignoredProp, null);
    assert.equal(result.newData[1].name, "Bob marley2");
    assert.equal(result.newData[1].wantedProp, null);
    assert.equal(result.newData[1].ignoredProp, null);
  });

  it("mapProperties() should map object ignoring some fields", () => {
    let json = {
      field: 42,
      data: {
        wantedProp: "Bob marley",
        ignoredProp: "Word"
      }
    };
    let mapping = {
      "object:newData": {
        jsonPath : "$.data",
        mapping: {
          "string:name" : "$.wantedProp",
        }
      }
    };
    let result = JSONPathMapper.mapProperties(mapping, json);
    assert.equal(typeof result.newData, "object");
    assert.equal(Array.isArray(result.newData), false);
    assert.equal(result.newData.name, "Bob marley");
    assert.equal(result.newData.wantedProp, null);
    assert.equal(result.newData.ignoredProp, null);
  });

});

