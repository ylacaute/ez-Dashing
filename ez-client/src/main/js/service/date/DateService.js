
export default class DateService {

  static FIXED_DATE = null;

  static now() {
    return DateService.FIXED_DATE ? DateService.FIXED_DATE : new Date;
  }

};

