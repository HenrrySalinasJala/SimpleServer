const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const errorHandler = require('errorhandler');
const chalk = require('chalk');
const debug = require('debug')('app');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

let db;

if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/SimpleAutomationAPI_Test')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
} else {
  db = mongoose.connect('mongodb://localhost/SimpleAutomationAPI')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
}

const Suite = require('./models/suiteModel');
const suiteRouter = require('./routes/suiteRoutes')(Suite);

app.use('/api/Suites', suiteRouter);


const Test = require('./models/testModel');
const testRouter = require('./routes/testRoutes')(Test);

app.use('/api/Tests', testRouter);


// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler());
}

const server = http.createServer(app)
server.listen(app.get('port'), () => {
  debug(`Express server listening on port ${chalk.default.green(app.get('port'))}`);
})

module.exports = app;