// Basic node server

const http = require('http');

// server
const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'application/json');
  // handling cors issues
  res.setHeader('Access-Control-Allow-Origin', '*');
  // status code
  res.writeHead(200);

  let dataObj = {
    name: 'My Node.js Server',
    description: 'This is a simple Node.js server.',
    version: 1.0,
    author: 'sudo'
  };
  let data = JSON.stringify(dataObj);
  res.end(data);
});

// listening port number
server.listen(1200, () => console.log('Listening on port 1200'));
