import UUID from 'utils/UUID';
import { assert } from 'chai';

describe('UUID', () => {

  it('random() should return a valid UUID', () => {
    let uuid = UUID.random();
    assert.equal(uuid.length, 36);
    assert.equal((uuid.toString().match(/-/g) || []).length, 4);
  });

});
