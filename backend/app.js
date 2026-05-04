var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var authRouter = require('./routes/auth');
var ordersRouter = require('./routes/orders');
var tablesRouter = require('./routes/tables');
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/admin', adminRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
