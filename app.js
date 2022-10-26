require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./lib/database/db_config');
const session = require('express-session');
const passportConfig = require('./lib/auth/passportConfig');
// const googleLogin = require('./lib/auth/googleStrategy');
const passport = require('passport');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const userRouter = require('./routes/userRouter');
const customerRouter = require('./routes/customerRouter');
const companyRouter = require('./routes/companyRouter');
const devRouter = require('./routes/devRouter');
const saleRouter = require('./routes/saleRouter');
const scheduleRouter = require('./routes/scheduleRouter');
const configRouter = require('./routes/configRouter');
// const googleRouter = require('./routes/googleLoginRouter');
const logoutRouter = require('./routes/logoutRouter');

const app = express();

db.connect();

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '150mb',
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

passportConfig.init(passport);

app.use(passport.initialize());
app.use(passport.session());

// TODO google login (error google pending)
// googleLogin.init();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/company', companyRouter);
app.use('/dev', devRouter);
app.use('/sale', saleRouter);
app.use('/schedule', scheduleRouter);
app.use('/config', configRouter);
// app.use('/auth', googleRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
