var express = require('express');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/register', function (req,res,next){
	res.render('register');
})
router.get('/auth/:email', function (req,res,next){
	var email = req.params.email
	isRegistered(email,function(match){
		if(match){
			console.log('already registered, redirect to wait');
			res.redirect('/')
		}else{
			console.log('not registered, redirect to typeform')
			res.redirect('https://ichauster.typeform.com/to/NMnJXC')
		}
	})
});
//8db8603fab6dab388dbce75a901979a4e53bbe91
//NMnJXC
function isRegistered(em,callback){
	var match = false;
	var req = {
		method:"GET",
		url : 'https://api.typeform.com/v1/form/NMnJXC?key=8db8603fab6dab388dbce75a901979a4e53bbe91&completed=true',
		headers : {'cache-control':'no-cache'}
	}
	request(req, function (error, response, body){
		if (error) throw new Error(error);
		var str = JSON.parse(body);
		var responses = str.responses
		for(i in str.responses){
			var a = str.responses[i].answers;
			var email = a["email_26818225"];
			console.log(email)
			if(em == email){
				console.log(em,email)
				match = true;
			}
		}
		console.log(match);
		callback(match);
		return match;
	});
}
module.exports = router;
