/**
 * Module dependencies.
 */

// var EventEmitter = require('events').EventEmitter;
// var ee = new EventEmitter();

/**
 * Expose `PubSub`.
 */

exports = module.exports = PubSub;

/**
 * Initialize a new `PubSub` bar test reporter.
 *
 * @param {Runner} runner
 * @param {Object} options
 * @api public
 */

function PubSub(runner, options) {
  var self = this
    , options = options || {}
    , total = runner.total;

  // default chars
  options.prefix = options.prefix || 'pubsub';

  /* TESTING PROCESS */
  // tests started
  runner.on('start', function(){
    process.emit(options.prefix + '-start', total);
  });

  // tests are complete, output some stats and the failures if any
  runner.on('end', function(){
    process.emit(options.prefix + '-end');
  });


  /* SUITES */
  // suite of tests started
  runner.on('suite', function(suite){
    process.emit(options.prefix + '-suite-start', suite);
  });

  // suite of tests completed
  runner.on('suite end', function(suite){
    process.emit(options.prefix + '-suite-end', suite);
  });


  /* TESTS */
  // test pending
  runner.on('pending', function(test){
    process.emit(options.prefix + '-test-pending', test);
  });

  // test passed
  runner.on('pass', function(test){
    process.emit(options.prefix + '-test-pass', test);
  });

  // test failed
  runner.on('fail', function(test, err){
    // process.emit(options.prefix + '-test-pass', test, err);
    process.emit(options.prefix + '-test-fail', test, err);
  });

}

