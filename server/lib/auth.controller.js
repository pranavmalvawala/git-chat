exports.github = (req, res) => {
  const io = req.app.get('io');
  // this data will be made availabe on client
  const user = {
    name: req.user.username,
    photo: req.user.photos[0].value,
    repos: req.user._json.repos_url
  };

  io.in(req.session.socketId).emit('github', user);
  res.end();
};

exports.chat = (req, res) => {
  const io = req.app.get('io');
  console.log('here', io);
  const chat = io.of('/my-chat');
  chat.on('connection', function(socket) {
    console.log('Socket connected');
  });
};
