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

// Model schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  githubId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// User model based on above schema
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

// this variable for sending users github data to React end
var githubPersonData;

// github passport strategy
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

// EVERY COMMUNICATION AND LOGIC BETWEEN REACT AND NODE IS DONE THROUGH
// RES.SEND HERE AND ACCESSING THAT THROUGH API IN REACT
// ANY BETTER METHODS APPRECIATED

app.get('/auth/github', passport.authenticate('github'));

// variable responsible for redirecting to chat after authenticating a GITHUB user
var githubResponse;

app.get(
  '/chatpage',
  passport.authenticate('github', { failureRedirect: '/authenticate' }),
  function(req, res) {
    githubResponse = 'Authenticated';
    // Successful authentication, redirect chatpage.
    res.redirect('http://localhost:3000/chatpage');
  }
);

// logout and delete the values of global variables
app.get('/logout', function(req, res) {
  githubResponse = null;

  req.logout();
  res.send({ response: 'success' });
});

// data on this api is most important for authentication purpose
app.get('/checkauth', function(req, res) {
  if (req.isAuthenticated()) {
    res.send({ response: 'user is authenticated' });
  } else {
    if (githubResponse === 'Authenticated') {
      res.send({ response: 'Authenticated', githubPersonData });
    } else {
      res.send({ response: 'user is not authenticated' });
    }
    // if (loginAuthenticate === 'User Available') {
    //   res.send({ response: 'user is authenticated' });
    // } else {
    //   if (authResponse === 'Authenticated') {
    //     res.send({ response: 'user is authenticated' });
    //   } else {
    //     if (githubResponse === 'Authenticated') {
    //       res.send({ response: 'user is authenticated', githubPersonData });
    //     } else {
    //       res.send({ response: 'user is not authenticated' });
    //     }
    //   }
    // }
  }
});

var server = app.listen(5000, function() {
  console.log('server started on port 5000');
});

// Socket setup
const io = socket(server);

io.on('connection', function(socket) {
  console.log('Connection made', socket.id);
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });
});
