import JsonUtils from "utils/JsonUtils";

describe("JsonUtils", () => {

  it("replaceVars() should return a new object with the same property names and values", () => {
    const inputJson = {
      hello : "world"
    };
    const vars = {
      var1: "value"
    };
    let result = JsonUtils.replaceVars(inputJson, vars);
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(inputJson));
  });

  it("replaceVars() should replace property value and propery name", () => {
    const inputJson = {
      root : {
        sample : "hello ${world}",
      },
      table: [{
        element1: "value"
      },{
        "${world}": "${world}"
      }]
    };
    const vars = {
      world: "world"
    };
    const expectedJson = {
      root : {
        sample : "hello world",
      },
      table: [{
        element1: "value"
      },{
        world: "world"
      }]
    };
    let result = JsonUtils.replaceVars(inputJson, vars);
    expect(JSON.stringify(result)).toStrictEqual(JSON.stringify(expectedJson));
  });


});
