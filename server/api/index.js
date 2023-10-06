const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const database = require('./src/firebase.js');
const jwt = require('./src/jwt');

const allowedOrigins = ['https://notgonnalie.vercel.app', 'https://notgonnalie.libyzxy0.repl.co'];

const corsOptions = {
  origins: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins
  }
})

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send('Ngl-Server by libyzxy0.')
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.post('/api', (req, res) => {
  require('./src/app').api(req, res, {
    jwt: jwt, 
    db: database,
    io: io
  });
});    

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
