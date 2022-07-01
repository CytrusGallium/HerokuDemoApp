console.log("Hello World :)")

const http = require('http');
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

console.log("URL = " + uri);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, User!</h1> <h3> Welcome Home</h3>\n');
});

server.listen(port, () => {
  console.log(`Server is running on port number::${port}`);
});