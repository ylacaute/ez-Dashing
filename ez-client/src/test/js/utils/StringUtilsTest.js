import StringUtils from "utils/StringUtils";
import { assert } from "chai";

describe("StringUtils", () => {

  it("format() should return the empty string if no argument", () => {
    let result = StringUtils.format();
    assert.equal(result, "");
  });

  it("format() should return the original string if only one argument", () => {
    let result = StringUtils.format("helloWorld");
    assert.equal(result, "helloWorld");
  });

  it("format() should inject 'null' if argument null", () => {
    let result = StringUtils.format("hello {} World", null);
    assert.equal(result, "hello null World");
  });

  it("format() should inject the second argument (int)", () => {
    let result = StringUtils.format("hello {} World", 42);
    assert.equal(result, "hello 42 World");
  });

  it("format() should inject the second argument (bool)", () => {
    let result = StringUtils.format("hello {} World", true);
    assert.equal(result, "hello true World");
  });

  it("format() should inject the second argument (object) with toString", () => {
    const obj = {
      toString: () => "hi"
    };
    let result = StringUtils.format("hello {} World", obj);
    assert.equal(result, "hello hi World");
  });

  it("format() should inject many arguments", () => {
    let result = StringUtils.format("{} {} {}", 0, "Hello", "World");
    assert.equal(result, "0 Hello World");
  });

  it("format() should inject many arguments from a single array argument", () => {
    let args = [ 0, "Hello", "World" ];
    let result = StringUtils.format("{} {} {}", args);
    assert.equal(result, "0 Hello World");
  });

  it("countSubString() should return 0 on null input", () => {
    let result = StringUtils.countSubString(null, "test");
    assert.equal(result, 0);
  });

  it("countSubString() should return 0 on null arg", () => {
    let input = "input";
    let result = StringUtils.countSubString(input, null);
    assert.equal(result, 0);
  });

  it("countSubString() should return 0", () => {
    let input = "input";
    let result = StringUtils.countSubString(input, "test");
    assert.equal(result, 0);
  });

  it("countSubString() should return many occurrences (case sensitive)", () => {
    let input = "input inin In";
    let result = StringUtils.countSubString(input, "in");
    assert.equal(result, 3);
  });

  it("replaceVars() should replace nothing", () => {
    let input = "My input ${var} something";
    let vars = {
      wrongVar : "value"
    };
    let result = StringUtils.replaceVars(input, vars);
    assert.equal(result, input);
  });

  it("replaceVars() should replace one var", () => {
    let input = "hello ${var}";
    let vars = {
      var : "world"
    };
    let result = StringUtils.replaceVars(input, vars);
    assert.equal(result, "hello world");
  });

  it("replaceVars() should replace many vars", () => {
    let input = "hello ${var} ${var} ${var2}";
    let vars = {
      var : "world",
      var2 : "world2",
    };
    let result = StringUtils.replaceVars(input, vars);
    assert.equal(result, "hello world world world2");
  });

  it("replaceVars() should not replace null var", () => {
    let input = "hello ${var} ${var} ${var2}";
    let vars = {
      var : null
    };
    let result = StringUtils.replaceVars(input, vars);
    assert.equal(result, input);
  });

});
