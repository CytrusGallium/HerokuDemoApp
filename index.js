console.log("Hello World :)")

const http = require('http');
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

//#region Database
const mongoose = require('mongoose');
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

const conSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    playerCount: {
        type: Number,
        required: true
    },
    port: {
        type: Number,
        required: true
    }
}, { collection: 'connections' })

const Con = mongoose.model('Connection', conSchema, 'connections');

const newCon = new Con( { state: "WAITING_PLAYER_TWO", port: 1, playerCount:2 } );
newCon.save();

//#endregion

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, User!</h1> <h3> Welcome Home</h3>\n');
});

server.listen(port, () => {
  console.log(`Server is running on port number::${port}`);
});