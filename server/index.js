const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const pgp = require('pg-promise')();

const cn = {
  host: 'localhost', // 'localhost' is the default;
  port: 5433, // 5432 is the default;
  database: 'manantial',
  user: 'postgres',
  password: 'urenafamily'
};

var db = pgp(cn)

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

//test req
app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

//GET: all registered users
app.get('/api/users', (req, res) => {
  db.any('SELECT * FROM account')
    .then(function(data) {
        // success;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    })
    .catch(function(error) {
        // error;
        console.log('error retrieving users', error)
    });
});

//POST: create new Person


//POST: create new user account

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);