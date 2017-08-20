import DateUtils from 'utils/DateUtils';


/**
 * Extract dates of configuration (string) to an array of Date.
 */
function parseDates(sprintDatesConfig) {
  if (sprintDatesConfig.length < 1) {
    throw {
      name: "Invalid configuration",
      message: "At least one date must be specified in sprintDates"
    };
  }
  return sprintDatesConfig.map(DateUtils.parse);
}

function generateDates(sprintStartDate, sprintDuration) {
  let dates = [];
  for (let i = 0; i < sprintDuration; i++) {
    dates.push(DateUtils.addDays(sprintStartDate, i));
  }
  return dates;
}


export default class SprintCalculator {

  /**
   * Calculation of the start date of the current sprint :
   *
   * The calculation is done from the given array dates in configuration. If the configuration
   * is not up to date, we try to guess the start date from the last known value of the array
   * dates and from the sprintDuration.
   */
  static calculateSprintData(now, sprintDatesConfig, theoreticalSprintDuration, sprintOffset) {
    const arrayDates = parseDates(sprintDatesConfig);
    let sprintDuration = theoreticalSprintDuration;
    let sprintNumber = 1;
    let sprintStartDate = null;

    // Nominal case : we find sprint dates in configuration
    for (let i = arrayDates.length - 1; i >= 0; i--) {
      if (now > arrayDates[i]) {
        sprintNumber = i + 1;
        sprintStartDate = arrayDates[i];
        if (i + 1 < arrayDates.length) {
          sprintDuration = DateUtils.diffInDays(sprintStartDate, arrayDates[i + 1]);
        }
        break;
      }
    }

    // Special case : sprintDates config is not up to date, we try to guess data
    const dayDiff = DateUtils.diffInDays(sprintStartDate, now);
    if (dayDiff < 0) {
      throw {
        name: 'Invalid Sprint configuration',
        message: 'All sprint dates are in the future'
      }
    }

    if (dayDiff > sprintDuration) {
      const doneSprints = Math.floor(dayDiff / (sprintDuration + 0));
      sprintNumber += doneSprints;
      sprintStartDate = DateUtils.addDays(sprintStartDate, (doneSprints * sprintDuration));
    }

    const sprintDays = DateUtils.diffInDays(sprintStartDate, now);

    return {
      number: sprintNumber + sprintOffset,
      days: sprintDays,
      daysLeft: sprintDuration - sprintDays,
      progress: Math.floor(sprintDays / sprintDuration * 100),
      dates: generateDates(sprintStartDate, sprintDuration)
    };
  }

}
