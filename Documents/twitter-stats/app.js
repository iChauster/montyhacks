var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Twitter = require('twitter');
var client = new Twitter()
var app = express()

passport.use(new TwitterStrategy({
	consumerKey : 'wCqMBOxGOYXOlBTn0oGqvSbaV',
	consumerSecret : 'RBbhUhKDgli1yxH4hWXqnNMoSXbFiPQ3VRyO8bI4f0rRI68adT',
	callbackURL : "http://localhost:3000/auth/twitter/callback"
}, function(token,tokenSecret,profile,done){
	client = new Twitter({
		consumer_key: 'wCqMBOxGOYXOlBTn0oGqvSbaV',
  		consumer_secret: 'RBbhUhKDgli1yxH4hWXqnNMoSXbFiPQ3VRyO8bI4f0rRI68adT',
 		access_token_key: token,
 		access_token_secret: tokenSecret
	})
	done(null,profile);
}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
app.use('/', routes);
app.listen(process.env.PORT || 3000, function(){
  console.log("gradeCheck: port : %d in %s", this.address().port, app.settings.env);
});
app.get('/profileStats', require('connect-ensure-login').ensureLoggedIn(), function (req,res){
		var parameters = {};
		parameters["screen_name"] = req.user["username"];
		parameters["include_rts"] = false;
		parameters["count"] = 200;
		var array = [];
		var maxID = "";
		var initialID;
		var numberTweets = req.user.user["statuses_count"];
		var iterations = numberTweets % 200;
		for (var i = 0; i < iterations; i ++){
			if(maxID != ""){
				parameters["max_id"] = maxID;
			}
			client.get('statuses/user_timeline',parameters, function(error,tweets,response){
				if(!error){
					for (var prop in tweets){
						var sentence = tweets[prop].text;
						var words = sentence.split(" ");
						if(prop == tweets.length-1){
							console.log('last============================');
							maxID = tweets[prop].id;
						}
						for (var i in words){
							array.push(words[i])
						}
					}
					
				}
			})
		}
		var newArray = orderByOccurrence(array);
		console.log(newArray)
		res.send(JSON.stringify(newArray))
})

function orderByOccurrence(arr) {
    var counts = {};
    arr.forEach(function(value){
        if(!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });

    return Object.keys(counts).sort(function(curKey,nextKey) {
        return counts[curKey] < counts[nextKey];
    });
}

module.exports = app;
