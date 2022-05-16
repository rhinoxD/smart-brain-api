const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const database = {
  users: [
    {
      id: '123',
      name: 'Ashley',
      email: 'ashley@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let isFound = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      isFound = true;
      return res.json(user);
    }
  });
  if (!isFound) {
    res.status(404).json('No such user.');
  }
});

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.status(200).json('Success!');
  } else {
    res.status(400).json('Error Logging In');
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: '125',
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });
  res.status(201).json(database.users[database.users.length - 1]);
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let isFound = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      isFound = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!isFound) {
    res.status(404).json('No such user.');
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
