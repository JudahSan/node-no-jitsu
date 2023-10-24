const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const util = require('util');
const formidable = require('formidable'); // parsing form data
const debug = require("debug")("app")

// Environment variable

const server = http.createServer((req, res) => {
  // req.method.toLowerCase();
  // console.log(http.METHODS); // http methods
  // console.log(http.STATUS_CODES); // http status codes
  // console.log(req.headers);
  // console.log(req.url);
  // debug 
  debug(req.url, req.method);
  debug(req.headers);
  let path = url.parse(req.url, true);
  // path.pathname path.search path.query - path, querystring, querystring object
  // path.port path.protocol path.origin - all nulls

  if (req.method.toLowerCase() == 'post') {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        // handle error
        console.log(err.message);
        return;
      }
      res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
      res.write('The POST output res \n\n');
      res.end(util.inspect({ fileds: fields, files: files }));
    });
  } else if (req.method.toLowerCase() == 'get') {
    req.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
    res.write('Out comes the response');
    res.write(util.inspect(path.query) + '\n\n');
    res.end('End of message');
  } else {
    // deal with other methods
  }

  // use this if you know the form data you are working with

  //   let decoder = new StringDecoder('utf-8');
  //   let buffer = '';
  //   req.on('data', chunk => (buffer += decoder.write(chunk)));

  //   req.on('end', () => {
  //     buffer += decoder.end();
  //     res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
  //     res.write('The response \n\n');
  //     res.write(util.inspect(path.query) + '\n\n');
  //     res.write(buffer + '\n\n');
  //     res.end('Out of data');
  //   });
});

server.listen(1200, () => {
  console.log('Listening on port 1200');
});
