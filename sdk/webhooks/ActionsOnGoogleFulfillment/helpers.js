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

exports.v60_timer_recipe = function(absolute_timing_seconds, timing_discounts, water_quantities) {
  let relative_timings = exports.relative_timings_seconds(absolute_timing_seconds);
  let timings = exports.timing_discounts(relative_timings, timing_discounts);

  const v60_timer_content = `
<speak>
  <p>Comece a colocar a água fervendo até ${water_quantities[0]} gramas.</p>
  <break time="${timings[0]}s" />
  <p>${exports.say_as_duration(absolute_timing_seconds[0])}. Ligue a chaleira novamente.</p>
  <break time="${timings[1]}s" />
  <p>${exports.say_as_duration(absolute_timing_seconds[1])}. Coloque a água até ${water_quantities[1]} gramas.</p>
  <break time="${timings[2]}s" />
  <p>${exports.say_as_duration(absolute_timing_seconds[2])}. Coloque a água até ${water_quantities[2]} gramas.</p>
  <break time="${timings[3]}s" />
  <p>${exports.say_as_duration(absolute_timing_seconds[3])}. Só aguardar o café terminar de filtrar.</p>
</speak>
`;

  return v60_timer_content;
};
