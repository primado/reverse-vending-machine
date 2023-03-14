const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

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

http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
