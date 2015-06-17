var express = require('express')
  , app = express()
  , supertest = require('supertest')
  , assert = require('assert')
  , should = require('chai').should()
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , port = 4000;

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.post('/signin', function(req, res) {
  req.session.user = req.body.user;
  req.session.save();
  setTimeout(function() {
    res.status(200).send('signin');
  },500);
});

app.get('/getsession', function(req, res) {
  res.status(200).send(req.session.user);
});

app.get('/dashboard', function(req, res) {
  if (req.session.user) return res.status(200).send('dashboard');
  res.status(401).send('dashboard');
});

app.all('/signout', function(req, res) {
  req.session.regenerate(function() {
    setTimeout(function() {
      res.status(200).send('signout');
    },500);
  });
});

app.get('/', function(req, res) {
  if (req.session.user) return res.redirect('/dashboard');
  res.status(200).send('home');
});

app.post('/redirect', function(req, res) {
  res.redirect('/simple');
});

app.get('/simple', function(req, res) {
  res.status(200).send('simple');
});

app.listen(port);
console.log('server started on port ' + port);

/*********************
 * PUB SUB HANDLING
 *********************/
process.on('pubsub-start', function(numTests) {
  console.log('☆☆☆ pubsub-start: Running ' + numTests + ' tests...');
});

process.on('★ pubsub-suite-start', function(suite) {
  console.log('pubsub-suite-start: Running suite: "' + suite.title + '"');
});

process.on('★ pubsub-suite-end', function(suite) {
  console.log('pubsub-suite-end: Running suite: "' + suite.title+ '"');
});

process.on('pubsub-test-pending', function(test) {
  console.log(' → pubsub-test-pending: "' + test.title+ '"');
});

process.on('pubsub-test-pass', function(test) {
  console.log(' ✔ pubsub-test-pass: "' + test.title+ '"');
});

process.on('pubsub-test-fail', function(test, err) {
  console.log(' ✖ pubsub-test-fail: "' + test.title + '"\n   ERROR: ' + err.message);
});

process.on('pubsub-end', function() {
  console.log('☆☆☆ pubsub-end - TESTING COMPLETE!');
});

/******************
 * MOCHA TESTS
 ******************/

describe('supertest GO!', function() {

  var agent1 = supertest.agent(app);
  var agent2 = supertest.agent(app);

  describe('Signin and check session and cookie for agent1', function(){
    it('should gain a session on POST', function(done) {
      agent1
        .post('/signin')
        .send({ user: 'agent1@marklogic.com' })
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('signin');
          done();
        });
    });

    it('check session for agent1', function(done) {
      agent1
        .get('/getsession')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('agent1@marklogic.com');
          done();
        });
    });

    it('check session for agent2 - does not exist', function(done) {
      agent2
        .get('/getsession')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('');
          done();
        });
    });


    it('signout agent1', function(done) {
      agent1
        .get('/signout')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('signout');
          done();
        });
    });

    it('check session for agent1 doesnt exist', function(done) {
      agent1
        .get('/getsession')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('');
          done();
        });
    });

  });

  describe('Signin and check session and cookie for agent2', function(){
    it('should gain a session on POST', function(done) {
      agent2
        .post('/signin')
        .send({ user: 'agent2@marklogic.com' })
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('signin');
          done();
        });
    });

    it('check session for agent2', function(done) {
      agent2
        .get('/getsession')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('agent2@marklogic.com');
          done();
        });
    });


    it('signout agent2', function(done) {
      agent2
        .get('/signout')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('signout');
          done();
        });
    });

    it('check session for agent2 doesnt exist', function(done) {
      agent2
        .get('/getsession')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('');
          done();
        });
    });

  });


  describe('GET /simple', function(){
    it('respond simple', function(done){
      agent1
        .get('/simple')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.text.should.equal('simple');
          done();
        });
    })
  });

});
