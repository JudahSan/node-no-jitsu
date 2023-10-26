const http = require('http');
const url = require('url');
const debug = require('debug')('app');


const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const port = env === 'development' ? 1234 : 5000;
const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url, true);
  let path = parsedURL.pathname;
  path = path.replace(/^\/+|\/+$/g, '');
  debug(path);
  let qs = parsedURL.query;
  let headers = req.headers;
  let method = req.method.toLowerCase();

  req.on('data', () => {
    console.log('got data');
    debug('Got some data');
  });

  req.on('end', () => {
    console.log('send response');
    debug('send response');

    let route =
      typeof routes[path] !== 'undefined' ? routes[path] : routes['notFound'];
    let data = {
      path: path,
      queryString: qs,
      headers: headers,
      method: method
    };

    route(data, res);
  });
});

server.listen(1234, () => {
  console.log(`Listening for ${env} port ${port}`);
});

let routes = {
  about: (data, res) => {
    let payload = {
      name: 'About'
    };
    let payLoadStr = JSON.stringify(payload);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.write(payLoadStr);
    res.end('\n');
  },
  'contact/schedule': (data, res) => {
    let payload = {
      name: 'Schedule',
      description: 'Schedule a meeting',
      today: +new Date()
    };
    let payLoadStr = JSON.stringify(payload);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.write(payLoadStr);
    res.end('\n');
  },
  contact: (data, res) => {
    let payload = {
      name: 'contact'
    };
    let payLoadStr = JSON.stringify(payload);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200);
    res.write(payLoadStr);
    res.end('\n');
  }
};
