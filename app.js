/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , Db = require('mongodb').Db
  , Server = require('mongodb').Server
  , http = require('http')
  , path = require('path');

var app = express();
var objn;
var db = new Db('products', new Server('localhost', 27017));
var product,npproduct,carproduct,tvproduct;

// all environments
app.set('port', process.env.PORT || 8080 );
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

db.open(function (err, db) {
	db.createCollection('prodCategory', function(err, collection){
			collection.find().toArray(function(err, documents) {
				product = documents;
		});
	});
	db.createCollection('np', function(err, collection){
			collection.find().toArray(function(err, documents) {
				npproduct = documents;

   
 });
});
	db.createCollection('tv', function(err, collection){
		collection.find().toArray(function(err, documents) {
			tvproduct = documents;
});
});
	db.createCollection('car', function(err, collection){
		collection.find().toArray(function(err, documents) {
			carproduct = documents;


});
});
});

app.get("/store", function(req, res){
	res.render("index", {product : product});
});

app.get("/store/tv", function(req, res){
	res.render("tv", {tvproduct : tvproduct});
});

app.get("/store/car", function(req, res){
	res.render("car", {carproduct : carproduct});
});

app.get("/store/np", function(req, res){
	res.render("np", {npproduct : npproduct});
});

app.get('/store/tv/:name', function(req, res){
	var name = req.params.name;
	db.collection('tv').findOne({imgn : name}, function(err,obj){
		res.render("tv1", {result : obj});
	});
});

app.get('/store/car/:name', function(req, res){
	var name = req.params.name;
	db.collection('car').findOne({imgn : name}, function(err,obj){
		res.render("car1", {result : obj});
	});
});

app.get('/store/np/:name', function(req, res){
	var name = req.params.name;
	db.collection('np').findOne({imgn : name}, function(err,obj){
		res.render("np1", {result : obj});
	});
});