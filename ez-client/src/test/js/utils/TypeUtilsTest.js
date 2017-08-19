import TypeUtils from "utils/TypeUtils";
import { assert } from "chai";
import moment from 'moment';

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

  it("convert() should convert to boolean", () => {
    assert.equal(TypeUtils.convert("true", "bool"), true);
    assert.equal(TypeUtils.convert("false", "bool"), false);
  });

  it("convert() should convert to integer", () => {
    assert.equal(TypeUtils.convert("42", "int"), 42);
  });

  it("convert() should convert to float", () => {
    assert.equal(TypeUtils.convert("42.5", "float"), 42.5);
  });

  it("convert() should convert to string", () => {
    assert.equal(TypeUtils.convert("42.5", "str"), "42.5");
  });

  it("convert() should convert to date a RFC 2822 formatted date: Sat, 13 Mar 2010 11:29:05 -0100", () => {
    assert.equal(
      TypeUtils.convert("Sat, 13 Mar 2010 11:29:05 -0100", "date").getTime(),
      new Date(2010, 2, 13, 12, 29, 5).getTime());
  });

  it("convert() should convert to date a non standard formatted date: Sat Aug 19 2017 16:58:34 GMT+0200 (CEST)", () => {
    assert.equal(
      TypeUtils.convert("Sat Aug 19 2017 16:58:34 GMT+0200 (CEST)", "date").getTime(),
      new Date(2017, 7, 19, 16, 58, 34).getTime());
  });

  it("convert() should convert to date a ISO 8601 formatted date: 2017-07-12T17:28:03.000+0200", () => {
    assert.equal(
      TypeUtils.convert("2017-07-12T17:28:03.000+0200", "date").getTime(),
      new Date(2017, 6, 12, 17, 28, 3).getTime());
  });

  it("convert() should convert to date a simplified ISO 8601 formatted date: 2017-07-12", () => {
    assert.equal(
      TypeUtils.convert("2017-07-12", "date").getTime(),
      new Date(2017, 6, 12).getTime());
  });

});
