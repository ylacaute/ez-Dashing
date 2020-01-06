import TypeUtils from "utils/type-utils";

describe("TypeUtils", () => {

  it("isNumber() should return false", () => {
    expect(TypeUtils.isNumber(null)).toStrictEqual(false);
    expect(TypeUtils.isNumber("")).toStrictEqual(false);
    expect(TypeUtils.isNumber("a")).toStrictEqual(false);
    expect(TypeUtils.isNumber([])).toStrictEqual(false);
    expect(TypeUtils.isNumber({})).toStrictEqual(false);
  });

  it("isNumber() should return true", () => {
    expect(TypeUtils.isNumber("-1")).toStrictEqual(true);
    expect(TypeUtils.isNumber(0)).toStrictEqual(true);
    expect(TypeUtils.isNumber("0.0009")).toStrictEqual(true);
    expect(TypeUtils.isNumber("1")).toStrictEqual(true);
    expect(TypeUtils.isNumber(1)).toStrictEqual(true);
    expect(TypeUtils.isNumber("999999")).toStrictEqual(true);
    expect(TypeUtils.isNumber(999.999)).toStrictEqual(true);
    expect(TypeUtils.isNumber("999999.01")).toStrictEqual(true);
  });

  it("isInt() should return false", () => {
    expect(TypeUtils.isInt(null)).toStrictEqual(false);
    expect(TypeUtils.isInt("")).toStrictEqual(false);
    expect(TypeUtils.isInt("a")).toStrictEqual(false);
    expect(TypeUtils.isInt([])).toStrictEqual(false);
    expect(TypeUtils.isInt({})).toStrictEqual(false);
    expect(TypeUtils.isInt(-0.1)).toStrictEqual(false);
    expect(TypeUtils.isInt(0.1)).toStrictEqual(false);
    expect(TypeUtils.isInt(99.99)).toStrictEqual(false);
  });

  it("isInt() should return true", () => {
    expect(TypeUtils.isInt(-1)).toStrictEqual(true);
    expect(TypeUtils.isInt(0)).toStrictEqual(true);
    expect(TypeUtils.isInt(1)).toStrictEqual(true);
    expect(TypeUtils.isInt(9999)).toStrictEqual(true);
  });


  it("isFloat() should return false", () => {
    expect(TypeUtils.isFloat(null)).toStrictEqual(false);
    expect(TypeUtils.isFloat("")).toStrictEqual(false);
    expect(TypeUtils.isFloat("a")).toStrictEqual(false);
    expect(TypeUtils.isFloat("1.1")).toStrictEqual(false);
    expect(TypeUtils.isFloat([])).toStrictEqual(false);
    expect(TypeUtils.isFloat({})).toStrictEqual(false);
    expect(TypeUtils.isFloat(1)).toStrictEqual(false);
    expect(TypeUtils.isFloat(0)).toStrictEqual(false);
    expect(TypeUtils.isFloat(4.0)).toStrictEqual(false);
  });

  it("isFloat() should return true", () => {
    expect(TypeUtils.isFloat(-1.1)).toStrictEqual(true);
    expect(TypeUtils.isFloat(1.02)).toStrictEqual(true);
    expect(TypeUtils.isFloat(9999.09)).toStrictEqual(true);
  });

  it("convert() should convert to boolean", () => {
    expect(TypeUtils.convert("true", "bool")).toStrictEqual(true);
    expect(TypeUtils.convert("false", "bool")).toStrictEqual(false);
  });

  it("convert() should convert to integer", () => {
    expect(TypeUtils.convert("42", "int")).toStrictEqual(42);
  });

  it("convert() should convert to float", () => {
    expect(TypeUtils.convert("42.5", "float")).toStrictEqual(42.5);
  });

  it("convert() should convert to string", () => {
    expect(TypeUtils.convert("42.5", "str")).toStrictEqual("42.5");
  });

  it("convert() should convert to date a RFC 2822 formatted date: Sat, 13 Mar 2010 11:29:05 -0100", () => {
   expect(TypeUtils.convert("Sat, 13 Mar 2010 11:29:05 -0100", "date").getTime())
       .toStrictEqual(new Date(2010, 2, 13, 13, 29, 5).getTime());
  });

  it("convert() should convert to date a non standard formatted date: Sat Aug 19 2017 16:58:34 GMT+0200 (CEST)", () => {
    expect(TypeUtils.convert("Sat Aug 19 2017 16:58:34 GMT+0200 (CEST)", "date").getTime())
      .toStrictEqual(new Date("Sat Aug 19 2017 16:58:34 GMT+0200 (CEST)").getTime());
  });

  it("convert() should convert to date a ISO 8601 formatted date: 2017-07-12T17:28:03.000+0200", () => {
    expect(TypeUtils.convert("2017-07-12T17:28:03.000+0200", "date").getTime())
      .toStrictEqual(1499873283000);
  });

  it("convert() should convert to date a simplified ISO 8601 formatted date: 2017-07-12", () => {
    expect(TypeUtils.convert("2017-07-12", "date").getTime())
      .toStrictEqual(new Date(2017, 6, 12).getTime());
  });

});
