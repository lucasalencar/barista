const dateFormat = require("dateformat");
const pluralize = require("pluralize-ptbr");

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

exports.say_as_duration = function(seconds) {
  const duration = new Date(0, 0, 0, 0, 0, seconds, 0);
  const durationSeconds = duration.getSeconds();
  const durationMinutes = duration.getMinutes();

  let output = [];

  if (durationMinutes > 0) {
    output = output.concat(`${durationMinutes} ${durationMinutes > 1 ? pluralize('minuto') : 'minuto'}`);
  }

  if (durationSeconds > 0) {
    output = output.concat(`${durationSeconds} ${durationSeconds > 1 ? pluralize('segundo') : 'segundo' }`);
  }

  return output.join(' e ');
};
