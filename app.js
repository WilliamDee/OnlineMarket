var express = require('express');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

const app = express();

// import routes
const storeRoutes = require('./routes/index');
const authRoutes = require('./authentication/authenticate');

// port settings
app.set('port', process.env.PORT || 8000);

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express-session settings
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

// Connect to mysql database
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({ // change mysql credentials 
		host: 'localhost',
		user: 'root',
		password: '', 
		database: 'store'
	});
	res.locals.connection.connect();
	next();
});

// routes
app.get('/', function(req, res){
	res.send('Congratulations! You made it!');
})
authRoutes.authRoutesConfig(app);
app.use('/store', storeRoutes);

// 404 error handling
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// start server to listen on port
app.listen(app.get('port'), function(){
	console.log(`server is listening on port ${app.get('port')}`);
});
