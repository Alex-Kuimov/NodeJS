const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { socketServer } = require('./services/socket.service');
const path = require('path');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server).listen(8000);

app.use(express.static(path.join(__dirname, 'build')));
app.use('/', express.static(path.join(__dirname, 'build')));

app.use(
	session({
		store: new FileStore(),
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

const User = require('./db').models.user;

const getUserbyName = async function (userName) {
    const user = await User.findOne({
      where: {
        userName: userName
      }
    });

    return user.dataValues;
};

const getUserbyID = async function (id) {
  const user = await User.findOne({
    where: {
      id: id
    }
  });

  return user.dataValues;
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  const user = await getUserbyID(id);
  const _user = user.id === id ? user : false;
  done(null, _user)
})

passport.use(new LocalStrategy({
  usernameField: "userName"
}, async (userName, password, done) => {

    const user = await getUserbyName(userName);

  if(userName === user.userName && password === user.password){
    return done(null, user)
  }else{
    return done(null, false)
  }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require(path.join(__dirname, 'api')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

io.on('connection', socketServer);

app.listen(3000, () => {});