const express = require('express');
const Sqlite = require('better-sqlite3');
const db = new Sqlite('messages.db', { verbose: console.log });
const authdb = new Sqlite('users.db', { verbose: console.log });
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

db.pragma("journal_mode = WAL");

const createTable_messages = "CREATE TABLE IF NOT EXISTS messages('message' varchar, 'channelID' int, 'author' varchar);"
db.exec(createTable_messages);

const createTable_auth = "CREATE TABLE IF NOT EXISTS auth('name' varchar, 'email' varchar, 'password' varchar);"
authdb.exec(createTable_auth);
app.post('/api/auth/register', (req, res) => {
    console.log(req.body)
    let fetchTable = authdb.prepare("SELECT * FROM auth WHERE email = '" + req.body.email + "';").all()
    if(fetchTable.length > 0){
        res.status(200).json({message: "found"})
    } else {
        const insert = authdb.prepare('INSERT INTO auth (name, email, password) VALUES (?, ?, ?)');
        insert.run(req.body.name, req.body.email, req.body.password);
        let fetchTable = authdb.prepare("SELECT * FROM auth WHERE email = '" + req.body.email + "';").all()
        res.status(200).json({message: fetchTable})
    }
})
app.post('/api/auth/login', (req, res) => {
  console.log(req.body)
  let fetchTable = authdb.prepare("SELECT * FROM auth WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "';").all()
    res.status(200).json({message: fetchTable})
    
})
app.get('/api/messages', (req, res) => {
  let fetchTable = db.prepare("SELECT * FROM messages WHERE channelID = " + req.query.channelID + ";").all()
    res.status(200).json({message: fetchTable})
  });

app.listen(4201, () => {
  console.log('DB endpoints listneing on port 4201!');
});


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