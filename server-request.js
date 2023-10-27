// Send HTTP Req from Node JS server
require('dotenv').config();

// const http = require('http');
const https = require('https');

const apiKey = process.env.SECRET_KEY;

const Stream = require('stream').Transform;
const fs = require('fs');

https
  .get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, (resp) => {
    console.log('First request successful. Processing response..');
    let data = '';

    // A chunk of data has been received
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result
    resp.on('end', () => {
      let url = JSON.parse(data).hdurl; // hdurl
      console.log(url);

      https.get(url, (res) => {
        console.log(res.headers);
        console.log(res.headers['content-type'], res.headers['content-length']);

        if (
          res.statusCode === 200 &&
          res.headers['content-type'] === 'image/jpeg'
        ) {
          let img = new Stream();

          res.on('data', (chunk) => img.push(chunk));

          res.on('end', () => {
            let filename = __dirname + '/nasa.jpg';
            fs.writeFileSync(filename, img.read());
            console.log('Image saved as nasa.jpg');
          });
        } else {
          console.error('Invalid response or content type');
        }
      });
    });
  })
  .on('error', (err) => {
    console.log('Error in first request' + err.message);
  });
