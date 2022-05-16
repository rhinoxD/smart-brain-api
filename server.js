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
      id: '1234',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get('/', (req, res) => {
  res.send('Working');
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

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
