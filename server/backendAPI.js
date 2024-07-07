const express = require('express');
const app = express();
const cors = require('cors') 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors()); 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/api/messages', (req, res) => {
    const fetchTable = db.prepare("SELECT * FROM messages WHERE channelID = " + req.query.channelID + ";").all()
    res.status(200).json({message: fetchTable})
  });

app.listen(4201, () => {
  console.log('DB endpoints listneing on port 4201!');
});


const Sqlite = require('better-sqlite3');

const db = new Sqlite('messages.db', { verbose: console.log });

db.pragma("journal_mode = WAL");


const createTable = "CREATE TABLE IF NOT EXISTS messages('message' varchar, 'channelID' int, 'author' varchar);"
db.exec(createTable);

const newmessage = db.prepare('INSERT INTO messages (message, channelID, author) VALUES (?, ?, ?)');

const io = require("socket.io")(4200, {
    cors:{
        origins: '*:*',
        methods:["GET", "POST"]
    }
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", (msg, author) => {
        console.log(msg)
        io.emit("message", msg, author)
        newmessage.run(msg, 1, author || 'unknown');
    })
})


// const newmsg = db.transaction((msgs) => {
//     newmessage.run(123456789, 'User', 1, 'Hello, World!', '', '', 0, 0);
//   });

// const row = db.prepare('SELECT * FROM messages').all() /*.get(userId); WHERE id = ?*/
// console.log(row);