var assert = require('assert');
var helpers = require('../helpers.js');

describe('relative_timings_seconds', function() {
  it('should return array with difference between previous ones', function() {
    assert.deepEqual(helpers.relative_timings_seconds([10, 20, 30, 40]), [10, 10, 10, 10]);
    assert.deepEqual(helpers.relative_timings_seconds([25, 45, 90, 225]), [25, 20, 45, 135]);
  });
});

describe('timing_discounts', function() {
  it('should return timings discounted', function() {
    assert.deepEqual(helpers.timing_discounts([10, 10, 10], [1, 2, 3]), [9, 8, 7]);
    assert.deepEqual(helpers.timing_discounts([10, 10, 10, 10], [1, 2, 3]), [9, 8, 7, 10]);
    assert.deepEqual(helpers.timing_discounts([10, 10, 10], [1, 2, 3, 4]), [9, 8, 7]);
    assert.deepEqual(helpers.timing_discounts([], [1, 2, 3, 4]), []);

    assert.deepEqual(helpers.timing_discounts([25, 20, 45, 135], [0, 4, 6, 5]), [25, 16, 39, 130]);
  });
});

describe('format_seconds_to_duration', function() {
  it('formats seconds', function() {
    assert.deepEqual(helpers.format_seconds_to_duration(1), "00:01");
    assert.deepEqual(helpers.format_seconds_to_duration(45), "00:45");
    assert.deepEqual(helpers.format_seconds_to_duration(60), "01:00");
    assert.deepEqual(helpers.format_seconds_to_duration(61), "01:01");
    assert.deepEqual(helpers.format_seconds_to_duration(60+30), "01:30");
  });
});

describe('say_as_duration', function() {
  it('returns say-as tag with duration interpretation', function() {
    assert.deepEqual(helpers.say_as_duration(1), '1 segundo');
    assert.deepEqual(helpers.say_as_duration(2), '2 segundos');
    assert.deepEqual(helpers.say_as_duration(25), '25 segundos');
    assert.deepEqual(helpers.say_as_duration(60), '1 minuto');
    assert.deepEqual(helpers.say_as_duration(61), '1 minuto e 1 segundo');
    assert.deepEqual(helpers.say_as_duration(70), '1 minuto e 10 segundos');
    assert.deepEqual(helpers.say_as_duration(3*60 + 45), '3 minutos e 45 segundos');
  });
});

describe('v60_timer_recipe', function() {
  it('returns whole recipe', function() {
    assert.deepEqual(
      helpers.v60_timer_recipe([1,2,3,4], [0,0,0,0], [10, 20, 30]),
      `
<speak>
  <p>Comece a colocar a ??gua fervendo at?? 10 gramas.</p>
  <break time="1s" />
  <p>1 segundo. Ligue a chaleira novamente.</p>
  <break time="1s" />
  <p>2 segundos. Coloque a ??gua at?? 20 gramas.</p>
  <break time="1s" />
  <p>3 segundos. Coloque a ??gua at?? 30 gramas.</p>
  <break time="1s" />
  <p>4 segundos. S?? aguardar o caf?? terminar de filtrar.</p>
</speak>
`
    );
  });
});
