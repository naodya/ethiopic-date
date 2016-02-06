var caethiopic = require('./lib/cldr-cal-ethiopic-full/main/am/ca-ethiopic');
var moment = require('moment-timezone');



function EtCalendar() {

  var etmonths = caethiopic.main.am.dates.calendars.ethiopic.months;
  var etdays = caethiopic.main.am.dates.calendars.ethiopic.days;
  var dayperiods = caethiopic.main.am.dates.calendars.ethiopic.dayPeriods;
  moment.tz.setDefault('Africa/Addis_Ababa');


  var calendar = {
    offset: 79372, //number of days between 1/1/1970 (UNIX time) and the calendar beginning year in this case 1753
    daymillisecond: 1000*60*60*24, //1000*60*60*24 represents one day in milliseconds.
    unixtimestamp: Date.parse(moment().format('M d, YYYY')),
    addistime: moment().format('MMMM d, YYYY h:mm A'),
  };

  calendar.daysdelta = parseInt((calendar.unixtimestamp/calendar.daymillisecond) + calendar.offset);

  calendar.month = function(month, format_type) {
    if(!format_type) format_type = 'wide';
    return etmonths.format[format_type][month];
  };

  calendar.day = function(day, format_type) {
    if(!format_type) format_type = 'wide';
    return etdays.format[format_type][day];
  };

  calendar.dayperiod = function(period, format_type) {
    if(!format_type) format_type = 'wide';
    return dayperiods.format[format_type][period];
  };

  calendar.now = function() {
    var days = calendar.daysdelta;
		var check = 0;
		var eyear = 1745; //Ethiopian calendary year equivalent of the beginng year 1753


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

    edayname = moment().format('ddd').toLowerCase();
    etime = moment().format('h:mm');
    period = moment().format('A').toLowerCase();

    return calendar.day(edayname) + ', ' + calendar.month(emonth) + ' ' + eday + ', ' + eyear + ' ' + etime + ' ' + calendar.dayperiod(period);

  };

  return calendar;

}

module.exports =  EtCalendar();



