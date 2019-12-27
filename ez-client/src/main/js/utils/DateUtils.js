import moment from 'moment';

export default class DateUtils {

  /**
   * Format JS Date object to "DD/MM"
   */
  static formatDDMM = (date) => {
    return moment(date).format("DD/MM");
  };

  /**
   * Format JS Date object to "DD/MM/YY"
   */
  static formatDDMMYY = (date) => {
    return moment(date).format("DD/MM/YY");
  };

  /**
   * Format JS Date object to "DD/MM/YYYY HH:mm"
   */
  static formatWithTime = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  /**
   * Parse a date in yyyy-mm-dd format. Months are 0-based, so we do -1
   */
  static parse = (input) => {
    let parts = input.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  /**
   * Return the difference in days between two dates ignoring time
   */
  static diffInDays = (first, second) => {
    let firstWithoutTime = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    let secondWithoutTime = new Date(second.getFullYear(), second.getMonth(), second.getDate());

    return Math.round((secondWithoutTime - firstWithoutTime) / (1000 * 60 * 60 * 24));
  };

  /**
   * Add days to a Date and return the result a new Date.
   */
  static addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Return Dates between two dates (day step). Time is set to 00:00:00.
   */
  static getAllDatesBetween(startDate, endDate, includeLastDate) {
    let result = [];
    let first = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    let end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    let nbDays = DateUtils.diffInDays(first, end);
    let date = first;
    for (let i = 0; i < nbDays; i++) {
      result.push(date);
      date = DateUtils.addDays(date, 1);
    }
    if (includeLastDate) {
      result.push(date);
    }
    return result;
  }

  static equalsAtDay(date1, date2) {
      return DateUtils.formatDDMMYY(date1) === DateUtils.formatDDMMYY(date2);
  }

}
