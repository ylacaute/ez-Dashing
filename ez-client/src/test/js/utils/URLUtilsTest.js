import URLUtils from "utils/URLUtils";
import { assert } from "chai";

describe("URLUtils", () => {

  it("serializeAsQueryParams() should return empty when null arg", () => {
    let obj = null;
    let result = URLUtils.serializeAsQueryParams(obj);
    assert.equal(result, "");
  });

  it("serializeAsQueryParams() should return empty when empty arg", () => {
    let obj = {};
    let result = URLUtils.serializeAsQueryParams(obj);
    assert.equal(result, "");
  });

  it("serializeAsQueryParams() should return one param", () => {
    let obj = {
      hello: "world"
    };
    let result = URLUtils.serializeAsQueryParams(obj);
    assert.equal(result, "?hello=world");
  });

  it("serializeAsQueryParams() should return two params", () => {
    let obj = {
      hello: "world",
      foo: "bar"
    };
    let result = URLUtils.serializeAsQueryParams(obj);
    assert.equal(result, "?hello=world&foo=bar");
  });

});
