require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const socketio = require("socket.io");
const authRouter = require("./lib/auth.router");
const passportInit = require("./lib/passport.init");

const app = express();

// Setup to accept JSON objects
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup for mongoDB
mongoose.connect("mongodb://localhost:27017/gitchatDB", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

// Model schema
const userSchema = mongoose.Schema({
  githubId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// User model based on above schema
const User = mongoose.model("User", userSchema);

app.use(passport.initialize());
passportInit();
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const server = app.listen(5000, () => {
  console.log("Server started on port 5000");
});

// Connecting sockets to the server and adding them to the request
// so that we can access them later in the controller
const io = socketio(server);
app.set("io", io);

// Direct other requests to the auth router
app.use("/", authRouter);

// // Socket setup

// io.on('connection', function(socket) {
//   console.log('Connection made', socket.id);
//   socket.on('chat', function(data) {
//     io.sockets.emit('chat', data);
//   });
// });
