const dateFormat = require("dateformat");

exports.relative_timings_seconds = function(absolute_timing_seconds) {
  const timing = absolute_timing_seconds.map((element, index, array) => {
    if (index == 0) {
      return element;
    } else {
      return element - array[index - 1];
    }
  });

  return timing;
};

exports.timing_discounts = function(timings, discounts) {
  return timings.map((element, index) => {
    let actual_discount = (discounts[index] == undefined) ? 0 : discounts[index];
    return element - actual_discount;
  });
};

exports.format_seconds_to_duration = function(seconds) {
  const duration = new Date(0, 0, 0, 0, 0, seconds, 0);
  return dateFormat(duration, "MM:ss");
};
