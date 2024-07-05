// const express = require('express');
// const app = express();
// const cors = require('cors')
// app.use(cors())
// const http = require('http');
// const server = http.createServer(app);
// const io = require("socket.io")((
//     server, {
//     cors: {
//       origin: "http://localhost:4200",
//       methods: ["GET", "POST"]
//     }
//   }));
// //const io = new Server(server);


// // app.get('/', (req, res) => {
// //   res.sendFile(__dirname + '/index.html');
// // });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('message', (msg) => {
//     console.log(msg)
//   });
// });

// server.listen(4200, () => {
//   console.log('listening on *:4200');
// });


const io = require("socket.io")(4200, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", (msg) => {
        console.log(msg)
        io.emit("message", msg)
    })
})