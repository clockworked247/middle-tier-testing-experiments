var gulp = require('gulp');
var mocha = require('gulp-mocha');

function handleError(err) {
  console.log(err.toString());
}

/* Multi-Mocha */
var reporterOptions = {
    "mocha-pubsub-reporter": {
        stdout:"-"
    },
    spec: {
        stdout:"-"
    }
};

gulp.task('default', function () {
  return gulp.src('server-and-tests.js')
    .pipe(mocha({reporter: 'mocha-multi', reporterOptions: reporterOptions}))
    .once('error', function (err) {
      handleError(err);
      process.exit(1);
    })
    .once('end', function () {
        process.exit();
    });
});
