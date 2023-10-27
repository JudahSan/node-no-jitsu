const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.API_PORT || 4444;

const bcrypt = require('bcrypt');
const saltRounds = 12;

const users = require('./data').users;

// handle json body req
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  // get email and password from req.body
  // check for no duplicate email
  let userMatch = users.find((user) => req.body.email === user.email);
  if (!userMatch) {
    passHash = await bcrypt.hash(req.body.password, saltRounds);

    let newUser = {
      _id: Date.now(),
      email: req.body.email,
      password: passHash,
    };
    user.push(newUser);
    console.log('Display All Users: ', users);

    res.status(201).send({ data: newUser });
  } else {
    res
      .status(400)
      .send({ error: { code: 400, message: 'Email address already exists' } });
  }
});

app.post('./login', async (req, res) => {
  // get email and password
  // find match for email
  let userMatch = users.find((user) => req.body.email === user.email);
  if (userMatch) {
    // compare password
    let submittedPass = req.body.password;
    let savedPass = userMatch.password;

    const isMatch = await bcrypt.compare(submittedPass, savedPass);
    if (isMatch) {
      res.status(200).send({ data: { token: 'this is a pretend token' } });
    } else {
      res
        .status(401)
        .send({ error: 401, message: 'invalid username or password' });
    }
  } else {
    // cause a delay to hide the fact that there was no match
    let fakePass = `$2b$${saltRounds}$invalidusernamebbbbbbbbbbbbbbbbbbbbbbbbb`;
    await bcrypt.compare(submittedPass, fakePass);

    // slow down process
    res
      .status(401)
      .send({ error: { code: 401, message: 'invalid username or password' } });
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log('Failure to launch server');
    return;
  }
  console.log(`Listening on port ${port}`);
});
