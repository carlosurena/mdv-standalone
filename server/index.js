//API Code for use with PostgreSQL DB if needed. Might switch back.
const path = require('path');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const pgp = require('pg-promise')();
const bcrypt = require('bcryptjs');
const config = require('./config/dbConfig');
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('./server/application.properties');

var db = pgp(config.cn);
const port = process.env.PORT || 3001;

//express
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
// const auth = require('./server/routes/auth');
// app.use('/auth', auth);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../build')));


//---------------- AUTHENTICATION/AUTHORIZATION ----------------------//
app.post('/api/login', (req, res) => {
  console.log(req.body.email, req.body.password);
});

app.post('/api/register', (req, res) => {
  console.log(req.body.username, req.body.password);
  const [
    email,
    username,
    password,
    auth_status,
    oauth_provider,
    photourl,
    person_id,
    active,
    last_login_date,
    created_by,
    updated_by
  ] = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log('error generating salt', err);
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log('error applying hash', err);
      }
      db.one(createUser, [
        email,
        username,
        hash,
        auth_status,
        oauth_provider,
        photourl,
        person_id,
        active,
        last_login_date,
        created_by,
        updated_by
      ])
        .then(data => {
          console.log(data.user_id); // print new account id;
          res.send(data.user_id);
        })
        .catch(error => {
          if (error.code === 23505) {
            //UNIQUE CONSTRAINT VIOLATION
            console.log('USER ALREADY EXISTS');
            res.status(400).send(JSON.stringify({ response: 'USER ALREADY EXISTS' }));
          } else {
            console.log('ERROR:', error); // print error;
            res.status(400).send(JSON.stringify({ response: 'ERROR' }));
          }
        });
    });
  });
});

//---------------- USER ACCOUNTS ----------------------//
const getAllUsers = properties.get('user.get.all');
const getUser = properties.get('user.get.one');
const createUser = properties.get('user.create.one');
const deleteUser = properties.get('user.delete.one');

//GET: all registered user accounts
app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log('get users ' + getAllUsers);
  db.any(getAllUsers)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving users', error);
    });
});

//GET: SINGLE USER ACCT
app.get('/api/users/:uid', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.oneOrNone(getUser, req.params.uid)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving users', error);
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
      if (error.code === 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('USER ALREADY EXISTS');
        res.status(400).send(JSON.stringify({ response: 'USER ALREADY EXISTS' }));
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400).send(JSON.stringify({ response: 'ERROR' }));
      }
    });
});

//PUT: update User Account -- wip
app.put('/api/users/:uid', (req, res) => {
  const requestingUser = 'curena';
  const data = {
    user_id: req.params.uid,
    email: 'carlitosway@gmail.com',
    username: 'curena',
    password: '1234',
    auth_status: 'member',
    photourl: null,
    active: true,
    last_login_date: null,
    updated_on: new Date(),
    updated_by: requestingUser
  };
  console.log('updating');

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
  res.setHeader('Content-Type', 'application/json');
  db.result(deleteUser, req.params.uid)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + ' rows deleted.'); // print how many records were deleted;
      res.send(JSON.stringify({ response: result.rowCount + ' rows deleted.' }));
    })
    .catch(error => {
      // error;
      console.log('error deleting user acct', error);
    });
});

//---------------- PEOPLE ----------------------//
const getAllPeople = properties.get('person.get.all');
const createPerson = properties.get('person.create.one');
const getPerson = properties.get('person.get.one');
const deletePerson = properties.get('person.delete.one');

//GET: all registered people
app.get('/api/people', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log('all people')
  db.any(getAllPeople)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving people', error);
    });
});

//GET: SINGLE PERSON
app.get('/api/people/:personId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.oneOrNone(getPerson, req.params.personId)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving person', error);
    });
});

//POST: create new Person
app.post('/api/people', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = req.body;
  console.log(data);
  var responseMsg = '';
  var requester = 'curena';
  db.one(createPerson, [
    data.first_name,
    data.middle_name,
    data.last_name,
    data.gender,
    data.birthdate,
    data.email,
    data.address,
    data.city,
    data.state,
    data.phone,
    data.member_type,
    data.allergies,
    data.grade,
    data.nickname,
    null,
    requester,
    requester
  ])
    .then(data => {
      console.log('person created, id: ' + data.person_id); // print new person id;
      responseMsg = 'Person created Successfully!';
    })
    .catch(error => {
      if (error.code === 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('PERSON ALREADY EXISTS');
        res.status(400);
        responseMsg = 'This person already exists.';
      } else if (error.code === 23502) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('MISSING REQUIRED FIELD');
        res.status(400);
        responseMsg = 'A required field is missing.';
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400);
        responseMsg = 'An error occurred while creating this person. Please try again later.';
      }
    })
    .then(() => {
      res.send(JSON.stringify({ response: responseMsg }));
    });
});

//PUT: update PERSON -- wip
app.put('/api/people/:pid', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const requestingUser = 'curena';
  const data = { ...req.body, updated_by: requestingUser };
  let responseMsg = '';

  console.log('updating');

  // Setup the query
  let query = updatePersonByID(req.params.pid, data);
  console.log(query);
  // Turn req.body into an array of values
  var colValues = Object.keys(data).map(function (key) {
    return data[key];
  });

  db.any(query, colValues)
    .then(data => {
      console.log(data[0].person_id); // print id;
      responseMsg = 'success';
    })
    .catch(error => {
      console.log('ERROR:', error); // print error;
      responseMsg = 'error';
    })
    .then(() => {
      res.send(JSON.stringify({ response: responseMsg }));
    });
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
  res.setHeader('Content-Type', 'application/json');
  db.result(deletePerson, req.params.personId)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + ' rows deleted.'); // print how many records were deleted;
      res.send(JSON.stringify({ response: result.rowCount + ' rows deleted.' }));
    })
    .catch(error => {
      // error;
      console.log('error deleting person', error);
    });
});

//------------------------------------------------------------------------//
//---------------------------------CHECK-INS------------------------------//
//------------------------------------------------------------------------//

//---------------- EVENTS ----------------------//
const getAllEvents = properties.get('checkins.events.get.all');
const createEvent = properties.get('checkins.events.create.one');
const getEvent = properties.get('checkins.events.get.one');
const deleteEvent = properties.get('checkins.events.delete.one');

//GET all events
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log('fetching events')
  console.log(req.body);
  db.any(getAllEvents)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving events', error);
    });
});

//POST: create new Event
app.post('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log("CREATING EVENT")
  const data = req.body;
  console.log(data);
  var responseMsg = '';
  var requester = 'curena';
  db.one(createEvent, [
    data.event_name,
    data.recurring,
    data.frequency,
    data.day_of_week,
    data.time_of_day,
    requester,
    requester
  ])
    .then(data => {
      console.log('event created, id: ' + data.event_id); // print new event id;
      responseMsg = 'Event created Successfully!';
    })
    .catch(error => {
      if (error.code === 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('EVENT ALREADY EXISTS');
        res.status(400);
        responseMsg = 'This event already exists.';
      } else if (error.code === 23502) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('MISSING REQUIRED FIELD');
        res.status(400);
        responseMsg = 'A required field is missing.';
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400);
        responseMsg = 'An error occurred while creating this event. Please try again later.';
      }
    })
    .then(() => {
      res.send(JSON.stringify({ response: responseMsg }));
    });
});

//GET: SINGLE EVENT
app.get('/api/events/:eventId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.oneOrNone(getEvent, req.params.eventId)
    .then(function (data) {
      // success;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving event', error);
    });
});


//Attendees

//GET: All attendees from a sheet



//----------- LOCATIONS ----------------------//

//---------------- SHEETS ----------------------//
const getSheet = properties.get('checkins.sheets.get.one.byId');
const createSheet = properties.get('checkins.sheets.create.one');
const getSheetByEventAndDate = properties.get('checkins.sheets.get.one.byEventAndDate');
const getAttendeesFromSheet = properties.get('checkins.attendees.get.perSheet');

//GET single  sheet by id
app.get('/api/sheets/:sheetId', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.oneOrNone(getSheet, req.params.sheetId)
    .then(function (data) {
      // success;
      if(data){
        //fetching Attendee Data
      db.manyOrNone(getAttendeesFromSheet, data.sheet_id)
        .then(function (attendees) {
          // success;
          data["attendees"] = attendees;
        })
        .catch(function (error) {
          // error;
          console.log('error retrieving sheet', error);
          return (JSON.stringify({ response: 'error retrieving sheet' }));

        }).then(() => {
          res.send(JSON.stringify(data));
        });
      }else{
        //Failed to find sheet?
          res.send(JSON.stringify(data));
      }

    })
    .catch(function (error) {
      // error;
      console.log('error retrieving sheet', error);
    });
});
//GET existing sheet 
//GET 1 sheet by event Id AND date
app.get('/api/sheetsByEventAndDate', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.query.eventId, req.query.date)
  db.oneOrNone(getSheetByEventAndDate, [parseInt(req.query.eventId), req.query.date])
    .then(function (data) {
      // success;
      if(data){
        //fetching Attendee Data
      db.manyOrNone(getAttendeesFromSheet, data.sheet_id)
        .then(function (attendees) {
          // success;
          data["attendees"] = attendees;
        })
        .catch(function (error) {
          // error;
          console.log('error retrieving sheet', error);
          return (JSON.stringify({ response: 'error retrieving sheet' }));

        }).then(() => {
          res.send(JSON.stringify(data));
        });
      }else{
          res.send(JSON.stringify(data));
      }
      

    })
    .catch(function (error) {
      // error;
      console.log('error retrieving sheet', error);
    });
});

//POST new sheet
app.post('/api/sheets', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log("CREATING SHEET")
  const data = req.body;
  console.log(data);
  var responseMsg = '';
  var requester = 'curena';
  db.one(createSheet, [
    data.event_id,
    1,
    data.sheet_date,
    requester,
    requester
  ])
    .then(data => {
      // success;
      console.log('sheet created, id: ' + data.sheet_id); // print new event id;
      responseMsg = 'Sheet created Successfully!';
      res.send(JSON.stringify(data));
    })
    .catch(error => {
      if (error.code === 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('SHEET ALREADY EXISTS');
        res.status(400);
        responseMsg = 'This sheet already exists.';
      } else if (error.code === 23502) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('MISSING REQUIRED FIELD');
        res.status(400);
        responseMsg = 'A required field is missing.';
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400);
        responseMsg = 'An error occurred while creating this sheet. Please try again later.';
      }
      res.send(JSON.stringify({ response: responseMsg }));

    });
});
//Update Sheet
// DELETE sheet

//------------------------------------------------------------------------//
//---------------------------------ATTENDEES------------------------------//
//------------------------------------------------------------------------//
//GET all  attendees for  1  sheet
const createAttendee = properties.get('checkins.attendees.create.one');
const deleteAttendee = properties.get('checkins.attendees.delete.one');

async function getAllAttendees(sheetId) {
  if (!sheetId) {
    //error
  } else {
    db.oneOrNone(getAttendeesFromSheet, sheetId)
      .then(function (data) {
        // success;
        console.log(data)
        return (JSON.stringify(data));
      })
      .catch(function (error) {
        // error;
        console.log('error retrieving sheet', error);
        return (JSON.stringify({ response: 'error retrieving sheet' }));

      });
  }

}


//POST new attendee
app.post('/api/attendees', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log("CREATING ATTENDEE")
  const data = req.body;
  console.log(data);
  var responseMsg = '';
  var requester = 'curena';
  db.one(createAttendee, [
    data.sheet_id,
    data.entry_type,
    data.person_id,
    data.headcount,
    requester,
    requester
  ])
    .then(data => {
      // success;
      console.log('attendee created, id: ' + data.entry_id); // print new attentee id;
      responseMsg = 'attendee created Successfully!';
      res.send(JSON.stringify(data));
    })
    .catch(error => {
      if (error.code === 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('ATTENDEE ALREADY EXISTS');
        res.status(400);
        responseMsg = 'This sheet already exists.';
      } else if (error.code === 23502) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log('MISSING REQUIRED FIELD');
        res.status(400);
        responseMsg = 'A required field is missing.';
      } else {
        console.log('ERROR:', error); // print error;
        res.status(400);
        responseMsg = 'An error occurred while registering this attendee. Please try again later.';
      }
      res.send(JSON.stringify({ response: responseMsg }));
    })
});

//DELETE ATTENDEE
//DELETE: DELETE User
app.delete('/api/attendees', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  db.result(deleteAttendee, [req.query.id, req.query.sheetId])
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + ' rows deleted.'); // print how many records were deleted;
      res.send(JSON.stringify({ response: result.rowCount + ' rows deleted.' }));
    })
    .catch(error => {
      // error;
      console.log('error deleting attendee', error);
    });
});

//------------------------------------------------------------------------//
//---------------------------------ASSETS------------------------------//
//------------------------------------------------------------------------//
const getUpcomingBirthdays = properties.get('query.get.upcomingBirthdays');

//GET: all birthdays in the next month
app.get('/api/assets/birthdays', (req, res) => {
  db.any(getUpcomingBirthdays)
    .then(function (data) {
      // success;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // error;
      console.log('error retrieving birthdays', error);
    });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

app.listen(port, () => console.log(`Express server is running on localhost:${port}`));
