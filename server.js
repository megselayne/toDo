const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

//routers requires here
const todoRouter = require('./routes/todo_router');
const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');

//initialize app
const app = express();
//load .env into the process
require('dotenv').config();

//middleware
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//views and publics
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//set port from environment or manually
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//index route
app.get('/', (req, res) => {
  res.render('index',{
    appName: 'ToDos',
  });
});

//app.use routers here
app.use('/todos',todoRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

//handle non-used routes
app.use('*', (req, res) => {
  res.status(404).send({
    error: 'Not Found',
  });
});

//error handler
app.use((err, req, res, next) => {
  res.status(500).send({ err, message: err.message });
});