

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
   *
   */
  static diffInDays = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  };

}
