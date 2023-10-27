// using debug package
const http = require('http');
const url = require('url');
const debug = require('debug')('app');

// listen for env variable NODE_ENV = development | production
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const port = env === 'development' ? 3000 : 5000;

const server = http.createServer((req, res) => {
  debug(req.url, req.method);
  debug(req.headers);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHeader(200, 'OK', { 'Conten-Type': 'application/json' });

  let dataObj = { id: 669, name: 'Scott', email: 'scot96@hotmail.org' };
  let data = JSON.stringify(dataObj);
  res.end(data);
});

server.listen(port, () => {
    console.log(`Listening for ${env} on port ${port}`);
})

// NODE_ENV=development DEBUG=app node <>.js
