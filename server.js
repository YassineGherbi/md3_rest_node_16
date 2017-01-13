/*
 main application file. Starting point of the backend
 */

// init environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let express  = require('./config/express'); // require web framework
const CONFIG = require('./config/config');
const PORT   = CONFIG.port;

// init web framework
let app = express();

// start listening on a port
app.listen(PORT);

module.exports = app;

console.log('Server running at http://localhost:' + PORT + '/');