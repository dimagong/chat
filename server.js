const http = require("http");
const express = require("express");
const app = express()

const server = http.createServer(app)
const { Server } = require("socket.io");

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

app.get('/', (req, res) => {
    res.send('<h1>Socket works correctly</h1>');
  });

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server is Connected to Port ${PORT}`))

io.on("connection", (socket) => {
    console.log('A Connection has been made')
    socket.on('disconnect', () => {
        console.log('A disconnection has been made')
    });
    
});


const textAnswer = [' !!! Hm. Is that all you want to say?', 'Is this really you?', "Let's get my $10 back first, okay?", "Okay, okay, keep going", "It's so nice to talk to smart man", "Ok I have to go"]


io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    
      if (msg) {
        
        let rand = Math.floor(Math.random() * textAnswer.length);
        const isMessage = {
          message: `${textAnswer[rand]}`,
          date: new Date(),
          type:'agent'
        }
        io.emit('message', isMessage);
    }
  });
 
});
