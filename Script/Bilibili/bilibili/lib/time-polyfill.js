console.time = function (label) {
  this._times = this._times || {};
  this._times[label] = Date.now();
};

console.timeEnd = function (label) {
  if (this._times && this._times[label]) {
    let timeElapsed = Date.now() - this._times[label];
    console.log(`${label}: ${timeElapsed}ms`);
    delete this._times[label];
  } else {
    console.log(`Timer with label ${label} does not exist.`);
  }
};
