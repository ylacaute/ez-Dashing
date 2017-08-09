import SprintCalculator from 'component/widget/sprint/SprintCalculator';
import { assert } from 'chai';

describe('SprintCalculator', () => {

  it('Should calculate sprintData between 2 given dates in config [First Sprint]', () => {
    let now = new Date(2017, 0, 5);
    let springDates = [ "2017-01-01", "2017-01-11"];
    let sprintDuration = 20; // Should not be used
    let springOffset = 0;    // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1 + springOffset);
    assert.equal(result.progress, 40);
    assert.equal(result.daysLeft, 6);
  });

  it('Should calculate sprintData between 2 given dates in config [Second Sprint]', () => {
    let now = new Date(2017, 0, 5);
    let springDates = [ "2016-12-15", "2017-01-01", "2017-01-11"];
    let sprintDuration = 20; // Should not be used
    let springOffset = 0;    // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 2 + springOffset);
    assert.equal(result.progress, 40);
    assert.equal(result.daysLeft, 6);
  });

  /**
   * Sprint is : 2017-01-01, 2017-02-02, 2017-02-03, 2017-02-04 = 4 days.
   * now is the second day : we have done 25% of the sprint, and there is 3 day left (counting today)
   */
  it('Should calculate sprintData with only last date (and now is < sprintDuration) [First Sprint]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 0;   // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1 + springOffset);
    assert.equal(result.progress, 25);
    assert.equal(result.daysLeft, 3);
  });

  /**
   * Sprint is : 2017-01-01, 2017-02-02, 2017-02-03, 2017-02-04 = 4 days.
   * now is the second day : we have done 25% of the sprint, and there is 3 day left (counting today)
   */
  it('Should calculate sprintData with only last date (and now is < sprintDuration) [Second Sprint]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2016-12-01", "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 0;   // Should do nothing

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 2 + springOffset);
    assert.equal(result.progress, 25);
    assert.equal(result.daysLeft, 3);
  });

  /**
   * Sprint is : 2017-01-01, 2017-02-02, 2017-02-03, 2017-02-04 = 4 days.
   * now is the second day : we have done 25% of the sprint, and there is 3 day left (counting today)
   * The sprint number should be 1 + offset
   */
  it('Should calculate sprintData with only last date (and now is < sprintDuration) [First Sprint, with offset]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 10;  // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1 + springOffset);
    assert.equal(result.progress, 25);
    assert.equal(result.daysLeft, 3);
  });

  /**
   * Sprint is : 2017-01-01, 2017-02-02, 2017-02-03, 2017-02-04 = 4 days.
   * now is the second day : we have done 25% of the sprint, and there is 3 day left (counting today)
   * The sprint number should be 1 + offset
   */
  it('Should calculate sprintData with only last date (and now is < sprintDuration) [Second Sprint, with offset]', () => {
    let now = new Date(2017, 0, 2);
    let springDates = [ "2016-12-01", "2017-01-01"];
    let sprintDuration = 4; // Should be used
    let springOffset = 10;  // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 2 + springOffset);
    assert.equal(result.progress, 25);
    assert.equal(result.daysLeft, 3);
  });

  /**
   * Should calculate sprint with a configuration absolutely not up to date
   *   2017-01-01 to 2017-01-11 : sprint 1
   *   2017-01-11 to 2017-01-21 : sprint 2
   *   2017-01-21 to 2017-01-31 : sprint 3
   *   2017-01-31 to 2017-01-09 : sprint 4
   *   2017-02-09 to 2017-02-19 : sprint 5
   *   2017-02-19 to 2017-03-01 : sprint 6 <= we are on the last day of the sprint
   */
  it('Should calculate sprintData with only last date (and now is > sprintDuration) [complex]', () => {
    let now = new Date(2017, 2, 1); // (1 March)
    let springDates = [ "2017-01-01" ];
    let sprintDuration = 10; // Should be used
    let springOffset = 10;   // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 6 + springOffset);
    assert.equal(result.progress, 90); // last day of a ten days sprint)
    assert.equal(result.daysLeft, 1);  // only the current day remaining
  });

  it('Should calculate progress rounded (95.xxxx to 90)', () => {
    let now = new Date(2017, 7, 9, 12, 46);
    console.log("FUCKING DATE NOW = " + now);
    let springDates = [ "2017-07-20", "2017-08-10" ];
    let sprintDuration = 21; // Should be used
    let springOffset = 8;    // Should be used

    let result = SprintCalculator.calculateSprintData(now, springDates, sprintDuration, springOffset);

    assert.equal(result.number, 1 + springOffset);
    assert.equal(result.progress, 95);
    assert.equal(result.daysLeft, 1);
  });


});

