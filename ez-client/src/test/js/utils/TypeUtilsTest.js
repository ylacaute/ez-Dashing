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
    assert.equal(TypeUtils.isNumber(1), true);
    assert.equal(TypeUtils.isNumber("999999"), true);
    assert.equal(TypeUtils.isNumber(999.999), true);
    assert.equal(TypeUtils.isNumber("999999.01"), true);
  });

  it("isInt() should return false", () => {
    assert.equal(TypeUtils.isInt(null), false);
    assert.equal(TypeUtils.isInt(""), false);
    assert.equal(TypeUtils.isInt("a"), false);
    assert.equal(TypeUtils.isInt([]), false);
    assert.equal(TypeUtils.isInt({}), false);
    assert.equal(TypeUtils.isInt(-0.1), false);
    assert.equal(TypeUtils.isInt(0.1), false);
    assert.equal(TypeUtils.isInt(99.99), false);
  });

  it("isInt() should return true", () => {
    assert.equal(TypeUtils.isInt(-1), true);
    assert.equal(TypeUtils.isInt(0), true);
    assert.equal(TypeUtils.isInt(1), true);
    assert.equal(TypeUtils.isInt(9999), true);
  });


  it("isFloat() should return false", () => {
    assert.equal(TypeUtils.isFloat(null), false);
    assert.equal(TypeUtils.isFloat(""), false);
    assert.equal(TypeUtils.isFloat("a"), false);
    assert.equal(TypeUtils.isFloat("1.1"), false);
    assert.equal(TypeUtils.isFloat([]), false);
    assert.equal(TypeUtils.isFloat({}), false);
    assert.equal(TypeUtils.isFloat(1), false);
    assert.equal(TypeUtils.isFloat(0), false);
    assert.equal(TypeUtils.isFloat(4.0), false);
  });

  it("isFloat() should return true", () => {
    assert.equal(TypeUtils.isFloat(-1.1), true);
    assert.equal(TypeUtils.isFloat(1.02), true);
    assert.equal(TypeUtils.isFloat(9999.09), true);
  });
});
