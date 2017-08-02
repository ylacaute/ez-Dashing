import DateUtils from 'utils/DateUtils';
import { assert } from 'chai';

describe('DateUtils', () => {

  it('format() should format as dd-MM-yyyy mm:hh', () => {
    let date = new Date(2017, 6, 30, 19, 39);
    assert.equal(DateUtils.format(date), "30-07-2017 19:39");
  });

  it('parse() should create a valid date from pattern yyyy-MM-dd', () => {
    let dateAsString = "2017-07-30";
    let date = DateUtils.parse(dateAsString);
    assert.equal(date.getFullYear(), 2017);
    assert.equal(date.getMonth(), 6);
    assert.equal(date.getDate(), 30);
  });

  it('diffInDays() should give the différence in days (0)', () => {
    let date1 = new Date(2017, 6, 30, 19, 39);
    let date2 = new Date(2017, 6, 30, 19, 39);
    assert.equal(DateUtils.diffInDays(date1, date2), 0);
  });

  it('diffInDays() should give the différence in days (42)', () => {
    let date1 = new Date(2017, 6, 30, 19, 39);
    let date2 = new Date(2017, 8, 10, 19, 39);
    assert.equal(DateUtils.diffInDays(date1, date2), 42);
  });

});

