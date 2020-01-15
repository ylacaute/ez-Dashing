import ArrayUtils from "utils/array-utils";

describe("ArrayUtils", () => {

  it("lasts() should return an empty array (negative count)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, -1);

    expect(result).toStrictEqual([]);
  });

  it("lasts() should return an empty array (count = 0)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, 0);
    expect(result).toStrictEqual([]);
  });

  it("lasts() should return only one element (count = 1)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, 1);
    expect(result).toStrictEqual([2]);
  });

  it("lasts() should return only one element because count is 5 but there is only one element in array", () => {
    let array = [0];
    let result = ArrayUtils.lasts(array, 5);
    expect(result).toStrictEqual([0]);
  });

  it("lasts() should return the last 3 elements (count = 3)", () => {
    let array = [0, 1, 2, 3];
    let result = ArrayUtils.lasts(array, 3);
    expect(result).toStrictEqual([1, 2, 3]);
  });

  it("splitToNArrays with no element", () => {
    let array = [];
    let result = ArrayUtils.splitToNArrays(array, 3);
    expect(result).toStrictEqual([]);
  });

  it("splitToNArrays with 1 element, by 1", () => {
    let array = [0];
    let result = ArrayUtils.splitToNArrays(array, 1);
    expect(result).toStrictEqual([
      [0]
    ]);
  });

  it("splitToNArrays with 2 elements, by 1", () => {
    let array = [0, 1];
    let result = ArrayUtils.splitToNArrays(array, 1);
    expect(result).toStrictEqual([
      [0]
    ]);
  });

  it("splitToNArrays with 4 elements, by 1", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.splitToNArrays(array, 1);
    expect(result).toStrictEqual([
      [0], [1], [2], [3]
    ]);
  });

});

