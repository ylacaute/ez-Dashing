
describe("REGEXP", () => {

  it("regexp should match a string inside another", () => {
    let input = "com.atlassian.greenhopper.service.sprint.Sprint@44df04c3[id=244,rapidViewId=124,state=CLOSED,name=Sprint 8 - AAA - R 2.19,startDate=2017-07-04T]";
    let sprintRegexp = /(.*)name=(.*),startDate(.*)/g;
    let match = sprintRegexp.exec(input);
    expect(match[2]).toStrictEqual("Sprint 8 - AAA - R 2.19");
  });

});
