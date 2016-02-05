var caethiopic = require('./bin/cldr-cal-ethiopic-full/main/am/ca-ethiopic');
var etmonths = caethiopic.main.am.dates.calendars.ethiopic.months;
var etdays = caethiopic.main.am.dates.calendars.ethiopic.days;

module.exports = {
  month: function(month, type) {
    if(!type) type = 'wide';
    return etmonths.format[type][month];
  },
  day: function(day, type) {
    if(!type) type = 'wide';
    return etdays.format[type][day];
  },
};



