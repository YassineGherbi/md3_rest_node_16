/**
 * Configuration for the webserver (express). Routing, middleware
 */
const CONFIG         = require('./config');
let express          = require('express'),
      morgan         = require('morgan'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override');

module.exports = () => {

	/** create the express app */
	var app = express();

	if(process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
		/** hier gaan we straks specifieke development middleware koppelen (bijvoorbeeld een logger) */
	} else if(process.env.NODE_ENV === 'production') {
		/** hier gaan we straks specifieke productie middleware koppelen (bijvoorbeeld compressie) */
	}

	/**
	 * Add required headers
	 */
	app.use((req, res, next) => {

		res.set('Access-Control-Allow-Origin', 'http://localhost:1337');

		/** setup REST actions */
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');

		/** Request headers you wish to allow */
		res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

		res.set('Access-Control-Allow-Credentials', true);

		next();
	});

	/** Dit zorgt ervoor dat we bij de variabelen kunnen die gepost zijn zoals je in PHP bij $_POST mag */
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	/**
	 * add json middleware as body parser
	 */
	app.use(bodyParser.json());

	/**
	 * enable PUT/DELETE REST
	 */
	app.use(methodOverride());

	app.get('/', (req, res) => {
		res.json({welcome: 'this is the main route'});
	});

	/**
	 * include all routing configuration
	 */
	require('../routes/user.routes.js')(app);

	// export the express app
	return app;
};
