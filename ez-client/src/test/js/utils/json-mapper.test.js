import JsonMapper from "utils/json-mapper";

describe("JsonMapper", () => {

  it("mapProperties() should map single string without specifying type", () => {
    let json = { field: "a string value" };
    let mapping = { "name": "$.field" };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.name).toStrictEqual("a string value");
  });

  it("mapProperties() should map single string with specifying type", () => {
    let json = { field: "a string value" };
    let mapping = { "string:name": "$.field" };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.name).toStrictEqual("a string value");
  });

  it("mapProperties() should map single int", () => {
    let json = { field: 42 };
    let mapping = { "int:name": "$.field" };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.name).toStrictEqual(42);
  });

  it("mapProperties() should map single date", () => {
    let json = { date: "2017-07-12T17:28:03.000+0200" };
    let mapping = { "date:myDate": "$.date" };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.myDate.getTime()).toStrictEqual(
        new Date("Wed Jul 12 2017 17:28:03 GMT+0200 (CEST)").getTime());
  });

  it("mapProperties() should map a regexp from a string", () => {
    // We first verify the regexp is ok
    let input = "something sprint=8,value=foobar";
    let regexp = /(.*)sprint=(.*),value(.*)/g;
    let match = regexp.exec(input);
    expect(match[2]).toStrictEqual("8");

    let json = { field: input };
    let mapping = {
      "regexp:number" : {
        jsonPath: "$.field",
        regexp: "(.*)sprint=(.*),value(.*)",
        matchIndex: 2
      }
    };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.number).toStrictEqual("8");
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
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.number).toStrictEqual(null);
  });

  it("mapProperties() should map a regexp taking the first element of returned array from JSONPath", () => {
    let json = { field: ["com....4c3[id=244...=CLOSED,name=Sprint 8 - AAA - R 2.19,startDate=2017-07...."] };
    let mapping = {
      "regexp:sprintNumber" : {
        jsonPath: "$.field",
        regexp: "(.*)name=Sprint[ ]([0-9]+)[ ](.*)",
        matchIndex: 2,
      }
    };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.sprintNumber).toStrictEqual("8");
  });

  it("mapProperties() should map a regexp and use the specified type to convert the result", () => {
    let json = { field: "com....4c3[id=244...=CLOSED,name=Sprint 10 - AAA - R 2.19,startDate=2017-07...." };
    let mapping = {
      "regexp:int:sprintNumber" : {
        jsonPath: "$.field",
        regexp: "(.*)name=Sprint[ ]([0-9]+)[ ](.*)",
        matchIndex: 2,
      }
    };
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.sprintNumber).toStrictEqual(10);
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
    let result = JsonMapper.mapProperties(mapping, json);
    expect(result.newData.length).toStrictEqual(2);
    expect(Array.isArray(result.newData)).toStrictEqual(true);
    expect(result.newData[0].name).toStrictEqual("Bob marley1");
    expect(result.newData[0].wantedProp).toStrictEqual(undefined);
    expect(result.newData[0].ignoredProp).toStrictEqual(undefined);
    expect(result.newData[1].name).toStrictEqual("Bob marley2");
    expect(result.newData[1].wantedProp).toStrictEqual(undefined);
    expect(result.newData[1].ignoredProp).toStrictEqual(undefined);
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
    let result = JsonMapper.mapProperties(mapping, json);
    expect(typeof result.newData).toStrictEqual("object");
    expect(Array.isArray(result.newData)).toStrictEqual(false);
    expect(result.newData.name).toStrictEqual("Bob marley");
    expect(result.newData.wantedProp).toStrictEqual(undefined);
    expect(result.newData.ignoredProp).toStrictEqual(undefined);
  });

});

