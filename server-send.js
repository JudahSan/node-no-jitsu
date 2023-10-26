const http = require('http');
const fs = require('fs').promises; // utilizing fs.promises for Promise-based file operations
const path = require('path');
const mime = require('mime-types'); // content type detection

require("dotenv").config();

const server = http.createServer(async (req, res) => {
  let imgPath = path.join(__dirname, '/nasa.jpg');

  try {
    await fs.access(imgPath, fs.constants.F_OK);
    const content = await fs.readFile(imgPath);

    const contentType = mime.contentType(path.extname(imgPath));
    res.writeHead(200, { 'Content-type': contentType });
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`${imgPath} does not exist`);
      res.writeHead(404, { 'Content-type': 'text/html' });
      res.end('<h1>No such image</h1>');
    } else {
      console.log(`Error accessing/reading ${imgPath}: ${err.message}`);
      res.writeHead(500, { 'Content-type': 'text/html' });
      res.end('<h1>Internal server error</h1>');
    }
  }
});

let port = process.env.PORT

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
