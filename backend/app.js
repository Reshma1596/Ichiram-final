require('dotenv').config();
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
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

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', indexRouter);
app.use('/api/menu', menuRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/admin', adminRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
