const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: 'postgresql-defined-05975',
    user: 'postgres',
    password: '123',
    database: 'smart-brain',
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(db.users);
});
app.get('/profile/:id', profile.handleProfileGet(db));
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt, saltRounds));
app.post('/imageurl', image.handleApiCall);
app.put('/image', image.handleImage(db));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
