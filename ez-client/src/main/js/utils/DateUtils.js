

export default class DateUtils {

  /**
   * Format JS Date object to 'dd-MM-yyyy hh:mm'
   */
  static format = (date) => {
    return ("0" + date.getDate()).slice(-2) + "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
      date.getFullYear() + " " +
      ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
  };

  /**
   * Parse a date in yyyy-mm-dd format. Months are 0-based, so we do -1
   */
  static parse = (input) => {
    let parts = input.split('-');
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

}
