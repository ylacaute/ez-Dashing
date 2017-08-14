import TypeUtils from "utils/TypeUtils";
import { assert } from "chai";

describe("TypeUtils", () => {

  it("isNumber() should return false", () => {
    assert.equal(TypeUtils.isNumber(null), false);
    assert.equal(TypeUtils.isNumber(""), false);
    assert.equal(TypeUtils.isNumber("a"), false);
    assert.equal(TypeUtils.isNumber([]), false);
    assert.equal(TypeUtils.isNumber({}), false);
  });

  it("isNumber() should return true", () => {
    assert.equal(TypeUtils.isNumber("-1"), true);
    assert.equal(TypeUtils.isNumber(0), true);
    assert.equal(TypeUtils.isNumber("0.0009"), true);
    assert.equal(TypeUtils.isNumber("1"), true);
    assert.equal(TypeUtils.isNumber("999999"), true);
    assert.equal(TypeUtils.isNumber("999999.01"), true);
  });

});
