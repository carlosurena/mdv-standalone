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
const getAllAccounts = properties.get('account.get.all')
const getAccount = properties.get('account.get.one')
const createAccount = properties.get('account.create.one')
const deleteAccount = properties.get('account.delete.one')


//GET: all registered user accounts
app.get('/api/accounts', (req, res) => {
  db.any(getAllAccounts)
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

//GET: SINGLE USER ACCT
app.get('/api/accounts/:accountId', (req, res) => {
  db.oneOrNone(getAccount, req.params.accountId)
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


//POST: create new user account
app.post('/api/accounts', (req, res) => {
  db.one(createAccount, ['carlos@testEmail.com', 'curena', 'test123', 'pending', null, null, 4, true, 'SYSTEM', 'SYSTEM'])
    .then(data => {
      console.log(data.account_id); // print new account id;
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

//PUT: update User Account -- wip
app.put('/api/accounts', (req, res) => {
  db.one(createAccount, ['carlos@testEmail.com', 'curena', 'test123', 'pending', null, null, 4, 'SYSTEM', 'SYSTEM'])
    .then(data => {
      console.log(data.account_id); // print new account id;
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



//DELETE: DELETE Account
app.delete('/api/accounts/:accountId', (req, res) => {
  db.result(deleteAccount, req.params.accountId)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify( {'response' : result.rowCount +' rows deleted.'}));
    })
    .catch(error => {
      // error;
      console.log('error deleting person', error)
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

//DELETE: DELETE Person
app.delete('/api/people/:personId', (req, res) => {
  db.result(deletePerson, req.params.personId)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify( {'response' : result.rowCount +' rows deleted.'}));
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
      console.log('credential check returned: ' +  data)
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