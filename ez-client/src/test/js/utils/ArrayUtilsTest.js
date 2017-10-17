import ArrayUtils from "utils/ArrayUtils";
import { assert } from "chai";
import { expect } from "chai";

describe("ArrayUtils", () => {

  it("lasts() should return an empty array (negative count)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, -1);
    assert.deepEqual(result, []);
  });

  it("lasts() should return an empty array (count = 0)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, 0);
    assert.deepEqual(result, []);
  });

  it("lasts() should return only one element (count = 1)", () => {
    let array = [0, 1, 2];
    let result = ArrayUtils.lasts(array, 1);
    assert.deepEqual(result, [2]);
  });

  it("lasts() should return only one element because count is 5 but there is only one element in array", () => {
    let array = [0];
    let result = ArrayUtils.lasts(array, 5);
    assert.deepEqual(result, [0]);
  });

  it("lasts() should return the last 3 elements (count = 3)", () => {
    let array = [0, 1, 2, 3];
    let result = ArrayUtils.lasts(array, 3);
    assert.deepEqual(result, [1, 2, 3]);
  });

});

