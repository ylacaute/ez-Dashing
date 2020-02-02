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

  const square = (value, key) => value * value;
  const keyPlusValue = (value, key) => key + value;

  it("mapValuesDeep() should pass on empty object", () => {
    const result = ObjectUtils.mapValuesDeep({}, square);
    expect(result).toStrictEqual({});
  });

  it("mapValuesDeep() should transform simple object", () => {
    const result = ObjectUtils.mapValuesDeep({ two: 2, three: 3 }, square);
    expect(result).toStrictEqual({ two: 4, three: 9 });
  });

  it("mapValuesDeep() should transform simple array", () => {
    const result = ObjectUtils.mapValuesDeep([2, 3], square);
    expect(result).toStrictEqual([4, 9]);
  });

  it("mapValuesDeep() should transform object with nested objects/arrays", () => {
    let input = { two: 2, obj: { three: 3, four: 4 }, arr: [5, 6] };
    let expectedOutput = { two: 4, obj: { three: 9, four: 16 }, arr: [25, 36] };

    const result = ObjectUtils.mapValuesDeep(input, square);
    expect(result).toStrictEqual(expectedOutput);
  });

  it("mapValuesDeep() should transform array with nested objects/arrays", () => {
    const result = ObjectUtils.mapValuesDeep([2, { three: 3, four: 4 }, [5, 6]], square);
    expect(result).toStrictEqual([
      4,
      { three: 9, four: 16 },
      [25, 36]
    ]);
  });

  it("mapValuesDeep() should pass object key to mapper function", () => {
    const result = ObjectUtils.mapValuesDeep({ key1: "foo", key2: "bar" }, keyPlusValue);
    expect(result).toStrictEqual({ key1: "key1foo", key2: "key2bar" });
  });

  it("mapValuesDeep() should pass array key (index) to mapper function", () => {
    const result = ObjectUtils.mapValuesDeep([0, 2, 4], keyPlusValue);
    expect(result).toStrictEqual([0, 3, 6]);
  });

  it("mapValuesDeep() should do nothing on non plain objects", () => {
    const now = new Date();
    const result = ObjectUtils.mapValuesDeep(now);
    expect(result).toStrictEqual(now);
  });
  
});
