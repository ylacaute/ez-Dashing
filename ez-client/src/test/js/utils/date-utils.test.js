import DateUtils from "utils/date-utils";

describe("DateUtils", () => {

  it("format() should format as DD/MM/YYYY", () => {
    let date = new Date(2017, 6, 30, 19, 39);
    expect(DateUtils.formatDDMM(date)).toStrictEqual("30/07");
  });

  it("formatWithTime() should format as DD/MM/YYYY HH:mm", () => {
    let date = new Date(2017, 6, 30, 19, 39);
    expect(DateUtils.formatWithTime(date)).toStrictEqual("30/07/2017 19:39");
  });

  it("parse() should create a valid date from pattern yyyy-MM-dd", () => {
    let dateAsString = "2017-07-30";
    let date = DateUtils.parse(dateAsString);
    expect(date.getFullYear()).toStrictEqual(2017);
    expect(date.getMonth()).toStrictEqual(6);
    expect(date.getDate()).toStrictEqual(30);
  });

  it("diffInDays() should give the difference in days (0)", () => {
    let date1 = new Date(2017, 6, 30, 19, 39);
    let date2 = new Date(2017, 6, 30, 19, 39);
    expect(DateUtils.diffInDays(date1, date2)).toStrictEqual(0);
  });

  it("diffInDays() should give the difference in days (42)", () => {
    let date1 = new Date(2017, 6, 30, 19, 39);
    let date2 = new Date(2017, 8, 10, 19, 39);
    expect(DateUtils.diffInDays(date1, date2)).toStrictEqual(42);
  });

  it("diffInDays() should give the difference in days (1) [Ignore exact time]", () => {
    let date1 = new Date(2017, 6, 30, 19, 46);
    let date2 = new Date(2017, 6, 31, 20, 42);
    expect(DateUtils.diffInDays(date1, date2)).toStrictEqual(1);
  });

  it("diffInDays() should give the difference in days (1) [Ignore exact time]", () => {
    let date1 = new Date(2017, 6, 30, 19, 46);
    let date2 = new Date(2017, 6, 31, 18, 42);
    expect(DateUtils.diffInDays(date1, date2)).toStrictEqual(1);
  });

  it("addDays() should return a new Date with one day more", () => {
    let date1 = new Date(2017, 6, 30);
    let date2 = new Date(2017, 6, 31);
    expect(DateUtils.addDays(date1, 1).getTime()).toStrictEqual(date2.getTime());
  });

  it("addDays() should return a new Date with the next month", () => {
    let date1 = new Date(2017, 6, 30);
    let date2 = new Date(2017, 7, 30);
    expect(DateUtils.addDays(date1, 31).getTime()).toStrictEqual(date2.getTime());
  });

  it("getAllDatesBetween() should return 0 days", () => {
    let start = new Date(2017, 6, 1);
    let end = new Date(2017, 6, 1);
    let result = DateUtils.getAllDatesBetween(start, end, false);
    expect(result.length).toStrictEqual(0);
  });

  it("getAllDatesBetween() should return 1 day", () => {
    let start = new Date(2017, 6, 1);
    let end = new Date(2017, 6, 1);
    let result = DateUtils.getAllDatesBetween(start, end, true);
    expect(result.length).toStrictEqual(1);
  });

  it("getAllDatesBetween() should return 3 days", () => {
    let start = new Date(2017, 6, 1);
    let end = new Date(2017, 6, 3);
    let result = DateUtils.getAllDatesBetween(start, end, true);
    expect(result.length).toStrictEqual(3);
    expect(result[0].getTime()).toStrictEqual(new Date(2017, 6, 1, 0, 0, 0).getTime());
    expect(result[1].getTime()).toStrictEqual(new Date(2017, 6, 2, 0, 0, 0).getTime());
    expect(result[2].getTime()).toStrictEqual(new Date(2017, 6, 3, 0, 0, 0).getTime());
  });

  it("equalsAtDay() should return true cause date exactly equals", () => {
      let date1 = new Date(2017, 6, 1, 1, 1, 1);
      let date2 = new Date(2017, 6, 1, 1, 1, 1);
      expect(DateUtils.equalsAtDay(date1, date2)).toStrictEqual(true);
  });

  it("equalsAtDay() should return true cause date equals at day (only minutes are different)", () => {
      let date1 = new Date(2017, 6, 1, 1, 1, 1);
      let date2 = new Date(2017, 6, 1, 1, 10, 1);
      expect(DateUtils.equalsAtDay(date1, date2)).toStrictEqual(true);
  });

  it("equalsAtDay() should return false cause different", () => {
      let date1 = new Date(2017, 6, 1, 1, 1, 1);
      let date2 = new Date(2017, 6, 2, 1, 1, 1);
      expect(DateUtils.equalsAtDay(date1, date2)).toStrictEqual(false);
  });

});

