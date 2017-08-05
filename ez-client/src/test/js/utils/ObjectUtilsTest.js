import ObjectUtils from 'utils/ObjectUtils';
import { assert } from 'chai';

describe('ObjectUtils', () => {

  it('isNullOrEmpty() should return true on null object', () => {
    let nullObj = null;
    assert.equal(ObjectUtils.isNullOrEmpty(nullObj), true);
  });

  it('isNullOrEmpty() should return true on empty object', () => {
    let emptyObj = {};
    assert.equal(ObjectUtils.isNullOrEmpty(emptyObj), true);
  });

  it('isNullOrEmpty() should return true on empty array', () => {
    let emptyArray = [];
    assert.equal(ObjectUtils.isNullOrEmpty(emptyArray), true);
  });

  it('isNullOrEmpty() should return false on object with properties', () => {
    let obj = { hello: 'world' };
    assert.equal(ObjectUtils.isNullOrEmpty(obj), false);
  });

  it('isNullOrEmpty() should return false on array with elements', () => {
    let array = ['Hello'];
    assert.equal(ObjectUtils.isNullOrEmpty(array), false);
  });

  it('typeOf() should return String', () => {
    let obj = 'Hello';
    assert.equal(ObjectUtils.typeOf(obj), 'String');
  });

  it('typeOf() should return Array', () => {
    let array = [];
    assert.equal(ObjectUtils.typeOf(array), 'Array');
  });

  it('typeOf() should return user defined type', () => {
    let SampleClass = () => {
    };
    let instance = new SampleClass();
    assert.equal(ObjectUtils.typeOf(instance), 'SampleClass');
  });

});
