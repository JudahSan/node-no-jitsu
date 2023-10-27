'use strict';

const data = require('./data/data');
const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');

app.use(express.json());

app.get('/api/channel', async (req, res, next) => {
  // return list of channels & respond with a 200
  try {
    res.status(200).json(data);
    console.log('GET', data.channels);
  } catch (error) {
    next(error);
  }
});

app.get('/api/channel/:id', async (req, res, next) => {
  // return specific channel and respond with 200
  try {
    let obj = data.channels.find((item) => item.id == parseInt(req.params.id));
    if(!obj) {
        return res.status(404).json({ error: 'Channel not found' })
    }
    res.status(200).json(obj);
    console.log('GET', obj);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
});

app.post(
  '/api/channel',
  [
    // Validate the 'name' parameter in the request body
    body('name').isLength({ min: 1 }).trim().withMessage('Name is required'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are validation errors, respond with a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }
    // add new channel the return new list
    // respond with a 201
    try {
      let { name } = req.body;
      console.log(req.body);
      let id =
        data.channels.reduce((prev, curr) => {
          return prev < curr.id ? curr.id : prev;
        }, 0) + 1;
      let last_update = Date.now();
      let obj = { id, name, last_update };
      data.channels.push(obj);
      res.status(201).json(obj);
    } catch (error) {
      next(error);
    }
  }
);

app.put('/api/channel/:id', async (req, res, next) => {
  // replace a channel based on id
  // respond with 200 or 204
  // 202 if the operation is async and still pending
  // Basically an update but we could also do an INSERT if the id is available
  // Or we could choose to create a new id and do an INSERT if the id does not exist
  try {
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex((item) => item.id === id);
    data.channels[idx].name = name;
    data.channels[idx].last_update = last_update;
    res.status(200).json(data.channels[idx]);
    console.log('PUT', data.channels);
  } catch (error) {
    next(error);
  }
});

app.patch('/api/channel/:id', async (req, res, next) => {
  // edit a channel
  // respond with 200 or 204
  // 202 if the operation is async and still pending
  try {
    let id = parseInt(req.params.id);
    let name = req.body.name;
    let last_update = Date.now();
    let idx = data.channels.findIndex((item) => item.id === id);
    data.channels[idx].name = name;
    data.channels[idx].last_update = last_update;
    res.status(200).json(obj);
    console.log('PATCH', data.channels);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/chanel/:id', async (req, res, next) => {
  // delete a channel
  // respond with 200 or 204
  // 202 if the operation is async and still pending
  try {
    let id = parseInt(req.params.id);
    data.channels = data.channels.filter((item) => item.id !== id);
    res.status(204).end();
    console.log('DELETE', data.channels);
  } catch (error) {}
});

app.head('/api/channel', async (req, res, next) => {
  // return same headers as get. no content. to check that endpoints if functional
  try {
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

app.options('/api/channel', async (req, res, next) => {
  // return headers including ALLOW to say what methods are allowd
  try {
    res.status(200);
    res.set('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.set('Access-Control-Allow-Origin', '*'); // cors
    res.set('Content-Length', '0');
    res.end();
  } catch (error) {
    next(error);
  }
});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening on port 3000');
});

// Note
// '200': 'OK',
// '201': 'Created',
// '202': 'Accepted',
// '204': 'No Content',
