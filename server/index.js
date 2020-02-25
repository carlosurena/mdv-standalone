const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var mysql = require('mysql')
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./server/application.properties');


const db = mysql.createConnection({
  host: '107.180.4.132', // 'localhost' is the default;
  database: 'manantial',
  user: 'carlosurenajr',
  password: 'vH5a67dcafag77D'
});

db.connect()

db.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);





// //test req
// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

//---------------- USER ACCOUNTS ----------------------//
const getAllUsers = properties.get('user.get.all')
const getUser = properties.get('user.get.one')
const createUser = properties.get('user.create.one')
const deleteUser = properties.get('user.delete.one')


//GET: all registered user accounts
app.get('/api/accounts', (req, res) => {
  db.query(getAllUsers, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
  })
});


// //GET: SINGLE USER ACCT
// app.get('/api/accounts/:accountId', (req, res) => {
//   db.oneOrNone(getAccount, req.params.accountId)
//     .then(function (data) {
//       // success;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(data));
//     })
//     .catch(function (error) {
//       // error;
//       console.log('error retrieving accounts', error)
//     });
// });

//POST: create new user account
app.post('/api/accounts', (req, res) => {
  db.query(createUser, (err, results, []) =>{
    if(err) throw err;
    //console.log(results.user_id); // print new account id;
    console.log('done')
  })
 
  res.send();
});

// //POST: create new user account
// app.post('/api/accounts', (req, res) => {
//   db.one(createAccount, ['carlos@testEmail.com', 'curena', 'test123', 'pending', null, null, 4, true, 'SYSTEM', 'SYSTEM'])
//     .then(data => {
//       console.log(data.account_id); // print new account id;
//     })
//     .catch(error => {
//       if (error.code == 23505) {
//         //UNIQUE CONSTRAINT VIOLATION
//         console.log('ACCOUNT ALREADY EXISTS');
//       } else {
//         console.log('ERROR:', error); // print error;
//       }
//     });
//   res.send();
// });

// //PUT: update User Account -- wip
// app.put('/api/accounts', (req, res) => {
//   db.one(createAccount, ['carlos@testEmail.com', 'curena', 'test123', 'pending', null, null, 4, 'SYSTEM', 'SYSTEM'])
//     .then(data => {
//       console.log(data.account_id); // print new account id;
//     })
//     .catch(error => {
//       if (error.code == 23505) {
//         //UNIQUE CONSTRAINT VIOLATION
//         console.log('ACCOUNT ALREADY EXISTS');
//       } else {
//         console.log('ERROR:', error); // print error;
//       }
//     });
//   res.send();
// });



// //DELETE: DELETE Account
// app.delete('/api/accounts/:accountId', (req, res) => {
//   db.result(deleteAccount, req.params.accountId)
//     .then(result => {
//       // success;
//       // rowCount = number of rows affected by the query
//       console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify( {'response' : result.rowCount +' rows deleted.'}));
//     })
//     .catch(error => {
//       // error;
//       console.log('error deleting person', error)
//     });
// });


// //---------------- PEOPLE ----------------------//
// const getAllPeople = properties.get('person.get.all')
// const createPerson = properties.get('person.create.one')
// const getPerson = properties.get('person.get.one')
// const deletePerson = properties.get('person.delete.one')

// //GET: all registered people
// app.get('/api/people', (req, res) => {
//   db.any(getAllPeople)
//     .then(function (data) {
//       // success;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(data));
//     })
//     .catch(function (error) {
//       // error;
//       console.log('error retrieving accounts', error)
//     });
// });

// //GET: SINGLE PERSON
// app.get('/api/people/:personId', (req, res) => {
//   db.oneOrNone(getPerson, req.params.personId)
//     .then(function (data) {
//       // success;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(data));
//     })
//     .catch(function (error) {
//       // error;
//       console.log('error retrieving accounts', error)
//     });
// });

// //POST: create new Person
// app.post('/api/people', (req, res) => {
//   db.one(createPerson, ['Carlos', 'E', 'Ureña', 'M', new Date(), 'carlosurenajr@gmail.com', '89 Leonard Dr.', 'Bridgeport', 'CT', '2035227369', 'visitor', null, 10, null, null, 'SYSTEM', 'SYSTEM'])
//     .then(data => {
//       console.log("person created, id: " + data.person_id); // print new account id;
//     })
//     .catch(error => {
//       if (error.code == 23505) {
//         //UNIQUE CONSTRAINT VIOLATION
//         console.log('ACCOUNT ALREADY EXISTS');
//       } else {
//         console.log('ERROR:', error); // print error;
//       }
//     });
//   res.send();
// });

// //DELETE: DELETE Person
// app.delete('/api/people/:personId', (req, res) => {
//   db.result(deletePerson, req.params.personId)
//     .then(result => {
//       // success;
//       // rowCount = number of rows affected by the query
//       console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify( {'response' : result.rowCount +' rows deleted.'}));
//     })
//     .catch(error => {
//       // error;
//       console.log('error deleting person', error)
//     });
// });

// //---------------- AUTHENTICATION/AUTHORIZATION ----------------------//
// const checkCredentials = properties.get('auth.login')

// //GET: VERIFY USER CREDENTIALS
// app.post('/api/auth/login', (req, res) => {
//   console.log('checking')
//   console.log(req)

//   db.one(checkCredentials, ['curena', 'tesdt123'])
//     .then(function (data) {
//       // success;
//       console.log('credential check returned: ' +  data)
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(data)); 
//     })
//     .catch(function (error) {
//       // error;
//       console.log('error verifying accounts', error)
//     });
// });

// //------------------------------------------------------------------------//
// //---------------------------------CHECK-INS------------------------------//
// //------------------------------------------------------------------------//

// //---------------- EVENTS ----------------------//

// //---------------- LOCATIONS ----------------------//

// //---------------- SHEETS ----------------------//

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
