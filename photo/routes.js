module.exports = function(app){
	console.log('routes');
	app.get('/', function(req,res){
		res.render('index');
	});
}