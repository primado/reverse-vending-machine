const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const WebSocketServer = require('ws');
dotenv.config();

const address = process.env.IP_ADDRESS;
const screen = {};
const screen1 = {};

app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const wss = new WebSocketServer.Server({ 
  port: 8081, 
  host: address
})

const wss1 = new WebSocketServer.Server({ 
  port: 8082, 
  host: address
})

wss.on("connection",(socket, req) => {
  console.log("Client Connected")
  let id = 0;
  while (true) {
    if (!screen.hasOwnProperty(id)) { screen[id] = socket; break; }
     id++;
  }

  socket.on("close", () => delete screen[id]);

  socket.on("message", msg => {
  let message = msg.toString();
  console.log(message)
      for (let s in screen) {
          screen[s].send(message);   
              }
         });
});

wss1.on("connection",(socket, req) => {
  console.log("Socket2 UP")
  let id = 0;
  while (true) {
    if (!screen.hasOwnProperty(id)) { screen[id] = socket; break; }
     id++;
  }

  socket.on("close", () => delete screen[id]);

  socket.on("message", msg => {
  let message = msg.toString();
  console.log(message)
      for (let s in screen) {
          screen[s].send(message);   
              }
         });
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/button1', (req, res) => {
  io.emit('button1');
  res.send('Button1 pressed!');
  console.log('Button1 pressed!')
});

app.post('/button2', (req, res) => {
    io.emit('button2');
    res.send('Button2 pressed!');
    console.log('Button2 pressed!')
  });

  app.post('/button3', (req, res) => {
    io.emit('button3');
    res.send('Button3 pressed!');
    console.log('Button3 pressed!')
  });


  app.post('/button4', (req, res) => {
    io.emit('button4');
    res.send('Button4 pressed!');
    console.log('Button4 pressed!')
  });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
