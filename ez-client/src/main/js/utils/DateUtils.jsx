

class DateUtils {
}

// Format JS Date object to
DateUtils.format = function (date) {
  return ("0" + date.getDate()).slice(-2) + "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
    date.getFullYear() + " " +
    ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
};

// parse a date in yyyy-mm-dd format
// Note: months are 0-based, so we do -1
DateUtils.parse = function (input) {
  var parts = input.split('-');
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

DateUtils.diffInDays = function (first, second) {
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

export default DateUtils;

