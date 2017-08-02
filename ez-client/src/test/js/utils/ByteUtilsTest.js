import ByteUtils from 'utils/ByteUtils';
import { assert } from 'chai';

describe('ByteUtils', () => {

  it('asLabel() should handle label with Mo if < 1000', () => {
    let label = ByteUtils.asLabel(900);
    assert.equal(label, "900 Mo");
  });

  it('asLabel() should handle label with Go if > 1000', () => {
    let label = ByteUtils.asLabel(3000);
    assert.equal(label, "3 Go");
  });

  it('asLabel() should handle label with Mo if = 1000', () => {
    let label = ByteUtils.asLabel(1000);
    assert.equal(label, "1000 Mo");
  });

  it('asLabel() should handle label with Go with float', () => {
    let label = ByteUtils.asLabel(1500);
    assert.equal(label, "1.5 Go");
  });

});

