import ObjectUtils from "utils/object-utils";

describe("ObjectUtils", () => {

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
