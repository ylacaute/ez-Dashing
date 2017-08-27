import JsonUtils from "utils/JsonUtils";
import { assert } from "chai";

describe("JsonUtils", () => {

  it("replaceVars() should return a new object with the same property names and values", () => {
    const inputJson = {
      hello : "world"
    };
    const vars = {
      var1: "value"
    };
    let result = JsonUtils.replaceVars(inputJson, vars);
    assert.equal(JSON.stringify(result), JSON.stringify(inputJson));
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
    assert.equal(JSON.stringify(result), JSON.stringify(expectedJson));
  });


});
