//API Code for use with PostgreSQL DB if needed. Might switch back.
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const pgp = require('pg-promise')();
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./server/application.properties');


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

//---------------- USER ACCOUNTS ----------------------//
const getAllUsers = properties.get('user.get.all')
const getUser = properties.get('user.get.one')
const createUser = properties.get('user.create.one')
const updateUser = properties.get('user.update.field.one')
const deleteUser = properties.get('user.delete.one')


//GET: all registered user accounts
app.get('/api/users', (req, res) => {
  db.any(getAllUsers)
    .then(function (data) {
      // success;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving users', error)
    });
});

//GET: SINGLE USER ACCT
app.get('/api/users/:uid', (req, res) => {
  db.oneOrNone(getUser, req.params.uid)
    .then(function (data) {
      // success;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving users', error)
    });
});


//POST: create new user account
app.post('/api/users', (req, res) => {
  db.one(createUser, ['carlos@testEmail.com', 'curena', 'test123', 'pending', null, null, 2, true, 'SYSTEM', 'SYSTEM'])
    .then(data => {
      console.log(data.user_id); // print new account id;
      res.send(data.user_id);

    })
    .catch(error => {
      if (error.code == 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('USER ALREADY EXISTS');
        res.status(400).send(JSON.stringify({ 'response': 'USER ALREADY EXISTS' }));
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400).send(JSON.stringify({ 'response': 'ERROR' }));
      }
    });
});

//PUT: update User Account -- wip
app.put('/api/users/:uid', (req, res) => {
  const requestingUser = 'curena';
  const data = { user_id: req.params.uid, email: 'carlitosway@gmail.com', username: 'curena', password: '1234', auth_status: 'member', photourl: null, active: true, last_login_date: null, updated_on: new Date(), updated_by: requestingUser };
  console.log('updating')

  // Setup the query
  let query = updateUserByID(req.params.uid, data);
  // Turn req.body into an array of values
  var colValues = Object.keys(data).map(function (key) {
    return data[key];
  });

  db.any(query, colValues)
    .then(data => {
      console.log(data[0].user_id); // print id;
    })
    .catch(error => {

      console.log('ERROR:', error); // print error;

    });
  res.send();

});

function updateUserByID(id, cols) {
  // Setup static beginning of query
  var query = ['UPDATE users'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')');
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE user_id = ' + id + ' RETURNING USER_ID');

  // Return a complete query string
  return query.join(' ');
}



//DELETE: DELETE User
app.delete('/api/users/:uid', (req, res) => {
  db.result(deleteUser, req.params.uid)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'response': result.rowCount + ' rows deleted.' }));
    })
    .catch(error => {
      // error;
      console.log('error deleting user acct', error)
    });
});


//---------------- PEOPLE ----------------------//
const getAllPeople = properties.get('person.get.all')
const createPerson = properties.get('person.create.one')
const getPerson = properties.get('person.get.one')
const deletePerson = properties.get('person.delete.one')

//GET: all registered people
app.get('/api/people', (req, res) => {
  db.any(getAllPeople)
    .then(function (data) {
      // success;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving accounts', error)
    });
});

//GET: SINGLE PERSON
app.get('/api/people/:personId', (req, res) => {
  db.oneOrNone(getPerson, req.params.personId)
    .then(function (data) {
      // success;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving accounts', error)
    });
});

//POST: create new Person
app.post('/api/people', (req, res) => {
  db.one(createPerson, ['Carlos', 'E', 'Ureña', 'M', new Date(), 'carlosurenajr@gmail.com', '89 Leonard Dr.', 'Bridgeport', 'CT', '2035227369', 'visitor', null, 10, null, null, 'SYSTEM', 'SYSTEM'])
    .then(data => {
      console.log("person created, id: " + data.person_id); // print new account id;
    })
    .catch(error => {
      if (error.code == 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('ACCOUNT ALREADY EXISTS');
      } else {
        console.log('ERROR:', error); // print error;
      }
    });
  res.send();
});

//PUT: update PERSON -- wip
app.put('/api/people/:pid', (req, res) => {
  const requestingUser = 'curena';
  const data = { first_name: 'Carlos', middle_name: 'Eliezer', last_name: 'Urena', updated_on: new Date(), updated_by: requestingUser };
  console.log('updating')

  // Setup the query
  let query = updatePersonByID(req.params.pid, data);
  console.log(query)
  // Turn req.body into an array of values
  var colValues = Object.keys(data).map(function (key) {
    return data[key];
  });

  db.any(query, colValues)
    .then(data => {
      console.log(data[0].person_id); // print id;
    })
    .catch(error => {

      console.log('ERROR:', error); // print error;

    });
  res.send();

});

function updatePersonByID(id, cols) {
  // Setup static beginning of query
  var query = ['UPDATE people'];
  query.push('SET');

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 1) + ')');
  });
  query.push(set.join(', '));

  // Add the WHERE statement to look up by id
  query.push('WHERE person_id = ' + id + ' RETURNING PERSON_ID');

  // Return a complete query string
  return query.join(' ');
}

//DELETE: DELETE Person
app.delete('/api/people/:personId', (req, res) => {
  db.result(deletePerson, req.params.personId)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'response': result.rowCount + ' rows deleted.' }));
    })
    .catch(error => {
      // error;
      console.log('error deleting person', error)
    });
});

//---------------- AUTHENTICATION/AUTHORIZATION ----------------------//
const checkCredentials = properties.get('auth.login')

//GET: VERIFY USER CREDENTIALS
app.post('/api/auth/login', (req, res) => {
  console.log('checking')
  console.log(req)

  db.one(checkCredentials, ['curena', 'tesdt123'])
    .then(function (data) {
      // success;
      console.log('credential check returned: ' + data)
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error verifying accounts', error)
    });
});

//------------------------------------------------------------------------//
//---------------------------------CHECK-INS------------------------------//
//------------------------------------------------------------------------//

//---------------- EVENTS ----------------------//

//---------------- LOCATIONS ----------------------//

//---------------- SHEETS ----------------------//

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);