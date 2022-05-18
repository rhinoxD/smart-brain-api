const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '123',
    database: 'smart-brain',
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
  login: [
    {
      id: '987',
      hash: '',
      email: 'ashley@gmail.com',
    },
  ],
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not Found');
      }
    })
    .catch((err) => res.status(400).json('Error getting user'));
});

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('Unable to get entries'));
});

// console.log(hash);

// Load hash from your password DB.
// bcrypt.compareSync(someOtherPlaintextPassword, hash); // false

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
