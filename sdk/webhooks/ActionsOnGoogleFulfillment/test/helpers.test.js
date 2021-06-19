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
