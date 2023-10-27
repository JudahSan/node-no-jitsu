// Create a server that can send back static files

require('dotenv').config();

const http = require('http');
const url = require('url');
const fs = require('fs');
const mime = require('mime-types')

const server = http.createServer((req, res) => {
  // handle the request and send back a static file
  // from a folder called `public`

  let parseURL = url.parse(req.url, true);

  //remove the leading and trailing slashes
  let path = parseURL.path.replace(/^\/+|\/+$/g, "");
  if ((path == '')) {
    path = 'index.html';
  }
  console.log(`Requested path ${path} `);

  let file = __dirname + '/public/' + path;

  // async read file function uses callback
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      // specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      let lookup = mime.lookup(path);
      res.writeHead(200, { 'Content-type': lookup })
    //   switch (path) {
    //     case 'main.css':
    //       res.writeHead(200, { 'Content-type': 'text/css' });
    //       break;
    //     case 'main.js':
    //       res.writeHead(200, { 'Content-type': 'application/javascript' });
    //       break;
    //     case 'index.html':
    //       res.writeHead(200, { 'Content-type': 'text/html' });
    //   }
      res.end(content);
    }
  });
});

let port = process.env.PORT;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
