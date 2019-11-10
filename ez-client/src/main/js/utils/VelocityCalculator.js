import Logger from "utils/Logger";
import DateUtils from 'utils/DateUtils';

const logger = Logger.getLogger("VelocityCalculator");

function spDoneAtDate(date, allSprintIssues) {
  let result = 0;
  let resolved = allSprintIssues
    .filter(issue => issue.resolutionDate != null)
    .filter(issue => DateUtils.formatDDMMYY(issue.resolutionDate) == DateUtils.formatDDMMYY(date));
  resolved.forEach(issue => {
    result += issue.storyPoints;
  });
  return result;
}

function getSprintStoryPoints(allSprintIssues) {
  let totalStoryPoints = 0;
  allSprintIssues.forEach(issue => {
    if (!issue.hasOwnProperty("storyPoints")) {
      logger.warn("No storyPoints defined for issue ", issue);
    } else {
      totalStoryPoints += issue.storyPoints;
    }
  });
  return totalStoryPoints;
}

export default class VelocityCalculator {

  /**
   * 01/01/2017 - 10/01/2017 (10 days)
   * 3 stories : 1SP + 2SP + 5SP
   * totalSP : 8SP
   * averageRatio : 8 / 10 = 0.8  (0.8P per day)
   *
   * 1 SP: 3day
   * 2 SP: 6days
   * 5 sp:
   */
  static calculatePlannedVelocity(dates, allSprintIssues) {
    const sprintDuration = dates.length;
    const totalStoryPoints = getSprintStoryPoints(allSprintIssues);
    const averageRatio = totalStoryPoints / sprintDuration;
    let plannedVelocity = [];

    dates.forEach(date => {
      plannedVelocity.push({
        date: DateUtils.formatDDMM(date),
        storyPoints: totalStoryPoints
      });
    });
    let dayOffset = 0;
    allSprintIssues.forEach(issue => {
      let nbDays = parseInt(issue.storyPoints / averageRatio) + 1;
      let dayIndex = dayOffset + nbDays;
      if (dayIndex > dates.length - 1) {
        dayIndex = dates.length - 1;
      }
      for (let i = dayIndex; i < plannedVelocity.length; i ++) {
        plannedVelocity[i].storyPoints -= issue.storyPoints;
      }
      dayOffset += nbDays;
    });
    return plannedVelocity;
  }

  static calculateVelocity(now, days, allSprintIssues) {
    let totalStoryPoints = getSprintStoryPoints(allSprintIssues);

    let velocity = [];
    let spDone = 0;
    for (let i = 0; i < days.length; i++) {
      if (days[i] >= now) {
        break;
      }
      spDone = spDone + spDoneAtDate(days[i], allSprintIssues);
      velocity.push({
        date: DateUtils.formatDDMM(days[i]),
        storyPoints: totalStoryPoints - spDone
      });
    }
    return velocity;
  }

  static calculate(now, sprintStartDate, sprintEndDate, allSprintIssues) {
    logger.info("Calculate velocity: sprintStartDate={}, sprintEndDate={}, allSprintIssues:",
      sprintStartDate,
      sprintEndDate,
      allSprintIssues);
    const days = DateUtils.getAllDatesBetween(sprintStartDate, sprintEndDate, true);
    return {
      plannedVelocity: VelocityCalculator.calculatePlannedVelocity(days, allSprintIssues),
      currentVelocity: VelocityCalculator.calculateVelocity(now, days, allSprintIssues)
    }
  }



}
