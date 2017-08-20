import SprintCalculator from 'component/widget/sprint/SprintCalculator';
import { assert } from 'chai';

describe('SprintCalculator', () => {

  /**
   * First day of Sprint: 2017-01-01
   * Last day of Sprint: 2017-01-10
   * Number of day: 10
   */
  it('Should calculateVelocity sprintData between 2 given dates in config [First Sprint]', () => {
    let now = new Date(2017, 0, 5);
    let springDates = [ "2017-01-01", "2017-01-11"];
    let sprintDuration = 20; // Should be ignored
    let springOffset = 0;    // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1);
    assert.equal(result.days, 4);      // 4 day have passed since the beginning
    assert.equal(result.daysLeft, 6);  // The current day is not finished, so it is not included
    assert.equal(result.progress, 40);
  });

  /**
   * First day of Sprint: 2017-01-01
   * Last day of Sprint: 2017-01-10
   * Number of day: 10
   */
  it('Should calculateVelocity sprintData between 2 given dates in config [Second Sprint]', () => {
    let now = new Date(2017, 0, 5);
    let springDates = [ "2016-12-15", "2017-01-01", "2017-01-11"];
    let sprintDuration = 20; // Should be ignored
    let springOffset = 0;    // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 2);
    assert.equal(result.days, 4);      // 4 day have passed since the beginning
    assert.equal(result.daysLeft, 6);  // The current day is not finished, so it is not included
    assert.equal(result.progress, 40);
  });

  /**
   * First day of Sprint: 2017-01-01
   * Sprint duration is 4
   * Expected last day of Sprint: 2017-01-04
   * Now is the second day: we have done 25% of the sprint with 3 day left
   */
  it('Should calculateVelocity sprintData with only last date (and now is < sprintDuration) [First Sprint]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 0;   // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1);
    assert.equal(result.days, 1);
    assert.equal(result.daysLeft, 3);
    assert.equal(result.progress, 25);
  });

  /**
   * First day of Sprint: 2017-01-01
   * Sprint duration is 4
   * Expected last day of Sprint: 2017-01-04
   * Now is the second day: we have done 25% of the sprint with 3 day left
   */
  it('Should calculateVelocity sprintData with only last date (and now is < sprintDuration) [Second Sprint]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2016-12-01", "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 0;   // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 2);
    assert.equal(result.days, 1);
    assert.equal(result.daysLeft, 3);
    assert.equal(result.progress, 25);
  });

  /**
   * First day of Sprint: 2017-01-01
   * Sprint duration is 4
   * Expected last day of Sprint: 2017-01-04
   * Now is the second day: we have done 25% of the sprint with 3 day left
   * The sprint number should be 1 + offset
   */
  it('Should calculateVelocity sprintData with only last date (and now is < sprintDuration) [First Sprint, with offset]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 10;  // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 11);
    assert.equal(result.days, 1);
    assert.equal(result.daysLeft, 3);
    assert.equal(result.progress, 25);
  });

  /**
   * First day of Sprint: 2017-01-01
   * Sprint duration is 4
   * Expected last day of Sprint: 2017-01-04
   * Now is the second day: we have done 25% of the sprint with 3 day left
   * The sprint number should be 2 + offset
   */
  it('Should calculateVelocity sprintData with only last date (and now is < sprintDuration) [Second Sprint, with offset]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2016-12-01", "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 10;  // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 12);
    assert.equal(result.days, 1);
    assert.equal(result.daysLeft, 3);
    assert.equal(result.progress, 25);
  });

  /**
   * Should calculateVelocity sprint with a configuration absolutely not up to date
   *   2017-01-01 to 2017-01-10 : sprint 1  - 10 days
   *   2017-01-11 to 2017-01-20 : sprint 2  - 20 days
   *   2017-01-21 to 2017-01-30 : sprint 3  - 30 days
   *   2017-01-31 to 2017-02-09 : sprint 4  - 40 days
   *   2017-02-10 to 2017-02-19 : sprint 5  - 50 days
   *   2017-02-20 to 2017-03-01 : sprint 6
   *
   *   We are the 2017-03-01 so the last day of the sprint 6 (+offset)
   *
   */
  it('Should calculateVelocity sprintData with only last date (and now is > sprintDuration) [complex]', () => {
    let now = new Date(2017, 2, 1); // (1 March)
    let springDates = [ "2017-01-01" ];
    let sprintDuration = 10; // Should be used
    let springOffset = 10;   // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 6 + springOffset);
    assert.equal(result.days, 9);
    assert.equal(result.daysLeft, 1);
    assert.equal(result.progress, 90);
    assert.equal(result.dates.length, 10);
    assert.equal(result.dates[0].getTime(), new Date(2017, 1, 20).getTime());
    assert.equal(result.dates[1].getTime(), new Date(2017, 1, 21).getTime());
    assert.equal(result.dates[9].getTime(), new Date(2017, 2, 1).getTime());
  });

  it('Should calculateVelocity progress rounded (95.xxxx to 90)', () => {
    let now = new Date(2017, 7, 9, 12, 46);
    let springDates = [ "2017-07-20", "2017-08-10" ];
    let sprintDuration = 21; // Should be used
    let springOffset = 8;    // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1 + springOffset);
    assert.equal(result.progress, 95);
    assert.equal(result.daysLeft, 1);
  });


});

