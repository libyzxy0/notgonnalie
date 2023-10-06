const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'https://notgonnalie.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

const io = socketIo(server, {
  cors: {
    origin: 'https://notgonnalie.vercel.app'
  }
})

app.get('/', (req, res) => res.send('Ngl-Server by libyzxy0.'));

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('send-message', (message) => {
    console.log('Received message: ' + message);
    io.emit('event', message);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
