import StringUtils from "utils/string-utils";

describe("StringUtils", () => {

  it("format() should return the empty string if no argument", () => {
    let result = StringUtils.format();
    expect(result).toStrictEqual("");
  });

  it("format() should return the original string if only one argument", () => {
    let result = StringUtils.format("helloWorld");
    expect(result).toStrictEqual("helloWorld");
  });

  it("format() should inject 'null' if argument null", () => {
    let result = StringUtils.format("hello {} World", null);
    expect(result).toStrictEqual("hello null World");
  });

  it("format() should inject the second argument (int)", () => {
    let result = StringUtils.format("hello {} World", 42);
    expect(result).toStrictEqual("hello 42 World");
  });

  it("format() should inject the second argument (bool)", () => {
    let result = StringUtils.format("hello {} World", true);
    expect(result).toStrictEqual("hello true World");
  });

  it("format() should inject the second argument (object) with toString", () => {
    const obj = {
      toString: () => "hi"
    };
    let result = StringUtils.format("hello {} World", obj);
    expect(result).toStrictEqual("hello hi World");
  });

  it("format() should inject many arguments", () => {
    let result = StringUtils.format("{} {} {}", 0, "Hello", "World");
    expect(result).toStrictEqual("0 Hello World");
  });

  it("format() should inject many arguments from a single array argument", () => {
    let args = [ 0, "Hello", "World" ];
    let result = StringUtils.format("{} {} {}", args);
    expect(result).toStrictEqual("0 Hello World");
  });

  it("countSubString() should return 0 on null input", () => {
    let result = StringUtils.countSubString(null, "test");
    expect(result).toStrictEqual(0);
  });

  it("countSubString() should return 0 on null arg", () => {
    let input = "input";
    let result = StringUtils.countSubString(input, null);
    expect(result).toStrictEqual(0);
  });

  it("countSubString() should return 0", () => {
    let input = "input";
    let result = StringUtils.countSubString(input, "test");
    expect(result).toStrictEqual(0);
  });

  it("countSubString() should return many occurrences (case sensitive)", () => {
    let input = "input inin In";
    let result = StringUtils.countSubString(input, "in");
    expect(result).toStrictEqual(3);
  });

  it("replaceVars() should replace the value zero", () => {
    let input = "${var}${var}7";
    let vars = {
      var: 0
    };
    let result = StringUtils.replaceVars(input, vars);
    expect(result).toStrictEqual("007");
  });

  it("replaceVars() should replace nothing", () => {
    let input = "My input ${var} something";
    let vars = {
      wrongVar : "value"
    };
    let result = StringUtils.replaceVars(input, vars);
    expect(result).toStrictEqual(input);
  });

  it("replaceVars() should replace one var", () => {
    let input = "hello ${var}";
    let vars = {
      var : "world"
    };
    let result = StringUtils.replaceVars(input, vars);
    expect(result).toStrictEqual("hello world");
  });

  it("replaceVars() should replace many vars", () => {
    let input = "hello ${var} ${var} ${var2}";
    let vars = {
      var : "world",
      var2 : "world2",
    };
    let result = StringUtils.replaceVars(input, vars);
    expect(result).toStrictEqual("hello world world world2");
  });

  it("replaceVars() should not replace null var", () => {
    let input = "hello ${var} ${var} ${var2}";
    let vars = {
      var : null
    };
    let result = StringUtils.replaceVars(input, vars);
    expect(result).toStrictEqual(input);
  });

});
