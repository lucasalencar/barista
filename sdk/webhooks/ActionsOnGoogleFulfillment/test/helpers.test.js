var assert = require('assert');
var helpers = require('../helpers.js');

describe('relative_timings_seconds', function() {
  it('should return array with difference between previous ones', function() {
    assert.deepEqual(helpers.relative_timings_seconds([10, 20, 30, 40]), [10, 10, 10, 10]);
    assert.deepEqual(helpers.relative_timings_seconds([25, 45, 90, 225]), [25, 20, 45, 135]);
  });
});
