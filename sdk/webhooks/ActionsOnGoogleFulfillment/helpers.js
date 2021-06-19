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
