var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nodescripts', express.static(path.join(__dirname, '/node_modules')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
/* IMPORTANT INFO
 “so how’s ur weekend going niva” “not bad i had a lot of vanilla ice cream” "I had 12 scoops but I wanted 24" yeah and my only 4 friends all decided that i was too high maintenance so they left  me” “oh that sucks. You’re still president of that club tho right?” “yeah but because i have no skills or experience whatsoever no one really listens to me. can’t imagine why, though.” “don’t worry, let it all out on the field. For marching band. Or whatever.” “yeah i try my best to let my insecurities show. I think it makes me a lot more attractive as a leader.” 
“whats happening’ -> u don’t want to know -> “I had a nice barbecue!”
Yes we had the decency to roast you behind ur back. We didn’t respect you enough to roast you in the face rjctd “Montesserat is the only real font”
“what’s happening” “everything except your social life”
“what’s happening” “nothing we jsut got 50 signatures on a petition that says ivan’s website is better than yours” 
“What’s happening” “we were just trading bitchy stories about you with your boyfriend, nothing much. What’s happening with you?”
You will be remembered. Who? Idk. LOL
“What’s happening” “oh ben me vineet and niva are gonna hang out in a new club we made called the non-president’s club” LMAO loln
“what’s happening” “we’re all registered for an english class and we would invite you but it’s for intermediate level not beginners”
“What’s happening” “we’re all going out to have vanilla ice cream” lmaooo we need a separate doc for these i refuse to let these go actually better to delete yeahhhh  lol pachuta does not know the first thing about this leadership team.
*/

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(process.env.PORT || 3000, function(){
  console.log("montyhacks: port : %d in %s", this.address().port, app.settings.env);
});

module.exports = app;
