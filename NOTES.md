Possible Combinations For Testing
----------------------------------
mocha/supertest
mocha/chai/supertest
mocha/chai/request -- still need to check out


Looking into Mocha Reporters as a way to publish


Can Mocha support multiple reporters?

Mocha still does not support multiple reporters
------------------------------------------------
https://github.com/mochajs/mocha/pull/1681


Planned API
----------------------
mocha --reporters [spec],[json:path/to/file],[nyan:path/to/file]

mocha sample.js --reporter spec,json:tmp/out.json --reporter-options spec{style=prettyprint,color=blue},json{prettify,indent=tabs}




Mocha Multi - alternative
--------------------------
http://www.juliengilli.com/2013/12/14/Using-multiple-reporters-with-Mocha/
https://github.com/glenjamin/mocha-multi



Create custom PubSub Reporter
--------------------------
Create module then use following to pack and install it.

npm pack /path/to/mocha-pubsub-reporter
npm install /path/to/your/module.gz -g
npm install -S mocha-pubsub-reporter-0.0.1.tgz



Pub/Sub in Node
----------------
var EventEmitter = require('events').EventEmitter;

var server = new EventEmitter();

server.on('foo', function() {
  console.log('got foo');
});

server.emit('foo', <optional variables>);

=======================================================================
Monday June 15, 2015 Meeting
=======================================================================

Test Multi-mocha

"Wouldn't it be nice"
Menu with status of mutliple threads of the build/test process
  - report only failures, single line

Architecture of the Pub/Sub eventer
  - # of errors
  - # of successes

Giant process aggregator that would manage all published events and handle rendering UI in console

Some must be strung together - i.e. cant do e2e tests before build is done.

--

Gulp orchestrator - handles "inter-task dependencies"
  - works out order on it's own by defining dependencies
  - Can it take a gulp stream?  Hoping to only depend only on the files each test requires
  - Would have to "teach the injector" - Daphne says that's probably overkill and not something we need to teach.

--

Tests run after a buffer - stream is buffered up and Gulp Mocha stuff runs.

-- ML Deploy --   Save an extension in my project, it get's redeployed.

-- Test -- mt node, mt java (ignore for 8.0-4), browser (fix skipped tests), e2e (might want to have more coverage), ml, syntax
  - xunit reporting
  - would like to do ALL of that in parallel (GOAL)

  - FLOW: Save change to a file
    - update running app "make it runnable"
    - posts "ready" to neaty-sweety console UI
    - fires browser refresh command
    - runs tests

Maintain concept of how WATCH works now.
Consider if we want to have e2e tests define which files apply to it.
Phantom JS?  Wasn't working properly.


Use node debug *****

--

Request vs Supertest
Look at Multi-Mocha
P/S so as to work on other non-mocha processes as well
UI in console - https://github.com/chjj/blessed (check problems for environments)
ML Deploy - works for browser code.  Doesn't work today for Marklogic code (extensions)
  - use filter to do specific task for files in different locations
  - merge all our streams back so that then the next task occurrs (testing)
Noch
Blessed

-- Will discuss below more later --

Sinon.js the mocha of mocking, stubbing, spying
  - routing would be replaced by sinon.js

  HTTP requests are input -> routing -> sinon dbclient
  js input -> db-client -> Nock ML (or leave ML)

- Some with ML, some with Noch
  ->


