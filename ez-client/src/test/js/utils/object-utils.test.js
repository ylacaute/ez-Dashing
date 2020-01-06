import ObjectUtils from "utils/object-utils";

describe("ObjectUtils", () => {

  it("isNullOrEmpty() should return true on null object", () => {
    let nullObj = null;
    expect(ObjectUtils.isNullOrEmpty(nullObj)).toStrictEqual(true);
  });

  it("isNullOrEmpty() should return true on empty object", () => {
    let emptyObj = {};
    expect(ObjectUtils.isNullOrEmpty(emptyObj)).toStrictEqual(true);
  });

  it("isNullOrEmpty() should return true on empty array", () => {
    let emptyArray = [];
    expect(ObjectUtils.isNullOrEmpty(emptyArray)).toStrictEqual(true);
  });

  it("isNullOrEmpty() should return false on object with properties", () => {
    let obj = { hello: "world" };
    expect(ObjectUtils.isNullOrEmpty(obj)).toStrictEqual(false);
  });

  it("isNullOrEmpty() should return false on array with elements", () => {
    let array = ["Hello"];
    expect(ObjectUtils.isNullOrEmpty(array)).toStrictEqual(false);
  });

  it("typeOf() should return String", () => {
    let obj = "Hello";
    expect(ObjectUtils.typeOf(obj)).toStrictEqual("String");
  });

  it("typeOf() should return Array", () => {
    let array = [];
    expect(ObjectUtils.typeOf(array)).toStrictEqual("Array");
  });

  it("typeOf() should return user defined type", () => {
    let SampleClass = () => {
    };
    let instance = new SampleClass();
    expect(ObjectUtils.typeOf(instance)).toStrictEqual("SampleClass");
  });

});
