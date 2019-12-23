import URLUtils from "utils/URLUtils";

describe("URLUtils", () => {

  it("serializeAsQueryParams() should return empty when null arg", () => {
    let obj = null;
    let result = URLUtils.serializeAsQueryParams(obj);
    expect(result).toStrictEqual("");
  });

  it("serializeAsQueryParams() should return empty when empty arg", () => {
    let obj = {};
    let result = URLUtils.serializeAsQueryParams(obj);
    expect(result).toStrictEqual("");
  });

  it("serializeAsQueryParams() should return one param", () => {
    let obj = {
      hello: "world"
    };
    let result = URLUtils.serializeAsQueryParams(obj);
    expect(result).toStrictEqual("?hello=world");
  });

  it("serializeAsQueryParams() should return two params", () => {
    let obj = {
      hello: "world",
      foo: "bar"
    };
    let result = URLUtils.serializeAsQueryParams(obj);
    expect(result).toStrictEqual("?hello=world&foo=bar");
  });

});
