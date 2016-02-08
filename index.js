var caethiopic = require('./lib/cldr-cal-ethiopic-full/main/am/ca-ethiopic');
var moment = require('moment-timezone');

function EtCalendar() {

  var etmonths = caethiopic.main.am.dates.calendars.ethiopic.months;
  var etdays = caethiopic.main.am.dates.calendars.ethiopic.days;
  var dayperiods = caethiopic.main.am.dates.calendars.ethiopic.dayPeriods;
  moment.tz.setDefault('Africa/Addis_Ababa');

  var calendar = {
    // Number of days between 1/1/1970 (UNIX time) and the calendar beginning year in this case 1753.
    offset: 79372,
    // One day milliseconds.
    daymillisecond: 1000*60*60*24,
  };

  var convertDate = function(gdate) {

    var originalDate = gdate;
    var addistime = gdate.format();
    var ehour = gdate.format('h');
    var eminute = gdate.format('mm');
    var esecond = gdate.format('ss');
    var eperiod = gdate.format('a');
    var edayname = gdate.format('ddd');

    // UTC timestamp minutes.
    var timeStampMinute = gdate.utc().format('X')*1000
    var days = parseInt((timeStampMinute/calendar.daymillisecond) + calendar.offset);
    var check = 0;
    // Ethiopian calendary year equivalent of the beginng year 1753.
    var eyear = 1745;

    // Calculate leap year.
    while (check == 0){
      if (eyear % 4 == 3)	{
        if (days >= 366) {
          days -= 366;
          eyear++;
        } else {check = 1;}
      } else {
        if (days >= 365) {
          days -= 365;
          eyear++;
        } else {check = 1;}
      }
    }

    if (parseInt(days) == 0) {
      eyear -= 1;
      emonth = 13;
      eday = 5 + ((eyear % 4 == 3) ? 1 : 0);
    } else {
      emonth = Math.ceil(days / 30);
      if (days % 30 == 0) {eday = 30;}
      else {eday = days % 30;}
    }

    return {
      'year': eyear,
      'month': emonth,
      'day': eday,
      'dayname': edayname.toLowerCase(),
      'hour': ehour,
      'minute': eminute,
      'second': esecond,
      'period': eperiod,
      'currentaddistime': moment().format(),
      'originaldate': originalDate.format()
    }

  };

  calendar.month = function(month, formatType) {
    if(!formatType) formatType = 'wide';
    return etmonths.format[formatType][month];
  };

  calendar.day = function(day, formatType) {
    if(!formatType) formatType = 'wide';
    return etdays.format[formatType][day];
  };

  calendar.dayperiod = function(period, formatType) {
    if(!formatType) formatType = 'wide';
    return dayperiods.format[formatType][period];
  };

  calendar.now = function() {

    var converted =  convertDate(moment(moment().format()));

    var result = calendar.day(converted.dayname) + ', ';
    result += calendar.month(converted.month) + ' ';
    result += converted.day + ', ';
    result += converted.year + ' ';
    result += converted.hour + ':';
    result += converted.minute + ':';
    result += converted.second + ' ';
    result += calendar.dayperiod(converted.period);

    return result;

  };

  return calendar;

}

module.exports =  EtCalendar();