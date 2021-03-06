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
//#endregion

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, User!</h1> <h3> Welcome Home</h3>\n');
  Log(req.socket.remoteAddress);
});

server.listen(port, () => {
  console.log(`Server is running on port number::${port}`);
});

function Log(addr)
{
  const newCon = new Con( { state: addr, port: port, playerCount:0 } );
  newCon.save();
}