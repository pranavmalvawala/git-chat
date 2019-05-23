require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GitHubStrategy = require('passport-github').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const socket = require('socket.io');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: 'our little secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/gitchatDB', {
  useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  githubId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var githubPersonData;

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/chatpage'
    },
    function(accessToken, refreshToken, profile, cb) {
      githubPersonData = profile;
      User.findOrCreate({ githubId: profile.id }, function(err, user) {
        return cb(err, user);
      });
    }
  )
);

var authResponse;

app.post('/signup', function(req, res) {
  User.register({ username: req.body.username }, req.body.password, function(
    err,
    user
  ) {
    if (err) {
      authResponse = 'Not Authenticated';
      res.send({ response: false });
    } else {
      passport.authenticate('local')(req, res, function() {
        authResponse = 'Authenticated';

        res.send({ response: true });
      });
    }
  });
});

app.get('/auth/github', passport.authenticate('github'));

var githubResponse;

app.get(
  '/chatpage',
  passport.authenticate('github', { failureRedirect: '/authenticate' }),
  function(req, res) {
    githubResponse = 'Authenticated';
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/chatpage');
  }
);

app.get('/authenticate', async function(req, res) {
  await res.send({ response: authResponse });
});

app.get('/logout', function(req, res) {
  authResponse = null;
  loginAuthenticate = null;
  githubResponse = null;

  req.logout();
  res.send({ response: 'success' });
});

var loginAuthenticate;

app.post('/login', function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      loginAuthenticate = 'User Not Available';
      res.send({ response: loginAuthenticate });
    } else {
      passport.authenticate('local')(req, res, function() {
        loginAuthenticate = 'User Available';
        res.send({ response: loginAuthenticate });
      });
    }
  });
});

app.get('/checkauth', function(req, res) {
  if (req.isAuthenticated()) {
    res.send({ response: 'user is authenticated' });
  } else {
    if (loginAuthenticate === 'User Available') {
      res.send({ response: 'user is authenticated' });
    } else {
      if (authResponse === 'Authenticated') {
        res.send({ response: 'user is authenticated' });
      } else {
        if (githubResponse === 'Authenticated') {
          res.send({ response: 'user is authenticated', githubPersonData });
        } else {
          res.send({ response: 'user is not authenticated' });
        }
      }
    }
  }
});

var server = app.listen(5000, function() {
  console.log('server started on port 5000');
});

// Socket setup
const io = socket(server);

io.on('connection', function(socket) {
  console.log('Connection made', socket.id);
});
