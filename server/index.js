//API Code for use with PostgreSQL DB if needed. Might switch back.
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const pgp = require("pg-promise")();
const bcrypt = require("bcryptjs");

require("./config/passport");
var PropertiesReader = require("properties-reader");

var properties = PropertiesReader("./server/application.properties");

const cn = {
  host: "127.0.0.1", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "manantial",
  user: "postgres",
  password: "urenafamily"
};

var db = pgp(cn);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
// const auth = require('./server/routes/auth');
// app.use('/auth', auth);

//test req
app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "World";
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

//---------------- AUTHENTICATION/AUTHORIZATION ----------------------//
app.post("/api/login", (req, res) => {
  console.log(req.body.email, req.body.password);
});

app.post("/api/register", (req, res) => {
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
      console.log("error generating salt", err);
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log("error applying hash", err);
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
          if (error.code == 23505) {
            //UNIQUE CONSTRAINT VIOLATION
            console.log("USER ALREADY EXISTS");
            res
              .status(400)
              .send(JSON.stringify({ response: "USER ALREADY EXISTS" }));
          } else {
            console.log("ERROR:", error); // print error;
            res.status(400).send(JSON.stringify({ response: "ERROR" }));
          }
        });
    });
  });
});

//---------------- USER ACCOUNTS ----------------------//
const getAllUsers = properties.get("user.get.all");
const getUser = properties.get("user.get.one");
const createUser = properties.get("user.create.one");
const deleteUser = properties.get("user.delete.one");

//GET: all registered user accounts
app.get("/api/users", (req, res) => {
  console.log("get users " + getAllUsers);
  db.any(getAllUsers)
    .then(function(data) {
      // success;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    })
    .catch(function(error) {
      // error;
      console.log("error retrieving users", error);
    });
});

//GET: SINGLE USER ACCT
app.get("/api/users/:uid", (req, res) => {
  db.oneOrNone(getUser, req.params.uid)
    .then(function(data) {
      // success;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    })
    .catch(function(error) {
      // error;
      console.log("error retrieving users", error);
    });
});

//POST: create new user account
app.post("/api/users", (req, res) => {
  db.one(createUser, [
    "carlos@testEmail.com",
    "curena",
    "test123",
    "pending",
    null,
    null,
    2,
    true,
    "SYSTEM",
    "SYSTEM"
  ])
    .then(data => {
      console.log(data.user_id); // print new account id;
      res.send(data.user_id);
    })
    .catch(error => {
      if (error.code == 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log("USER ALREADY EXISTS");
        res
          .status(400)
          .send(JSON.stringify({ response: "USER ALREADY EXISTS" }));
      } else {
        console.log("ERROR:", error); // print error;
        res.status(400).send(JSON.stringify({ response: "ERROR" }));
      }
    });
});

//PUT: update User Account -- wip
app.put("/api/users/:uid", (req, res) => {
  const requestingUser = "curena";
  const data = {
    user_id: req.params.uid,
    email: "carlitosway@gmail.com",
    username: "curena",
    password: "1234",
    auth_status: "member",
    photourl: null,
    active: true,
    last_login_date: null,
    updated_on: new Date(),
    updated_by: requestingUser
  };
  console.log("updating");

  // Setup the query
  let query = updateUserByID(req.params.uid, data);
  // Turn req.body into an array of values
  var colValues = Object.keys(data).map(function(key) {
    return data[key];
  });

  db.any(query, colValues)
    .then(data => {
      console.log(data[0].user_id); // print id;
    })
    .catch(error => {
      console.log("ERROR:", error); // print error;
    });
  res.send();
});

function updateUserByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE users"];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function(key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE user_id = " + id + " RETURNING USER_ID");

  // Return a complete query string
  return query.join(" ");
}

//DELETE: DELETE User
app.delete("/api/users/:uid", (req, res) => {
  db.result(deleteUser, req.params.uid)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({ response: result.rowCount + " rows deleted." })
      );
    })
    .catch(error => {
      // error;
      console.log("error deleting user acct", error);
    });
});

//---------------- PEOPLE ----------------------//
const getAllPeople = properties.get("person.get.all");
const createPerson = properties.get("person.create.one");
const getPerson = properties.get("person.get.one");
const deletePerson = properties.get("person.delete.one");

//GET: all registered people
app.get("/api/people", (req, res) => {
  db.any(getAllPeople)
    .then(function(data) {
      // success;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    })
    .catch(function(error) {
      // error;
      console.log("error retrieving accounts", error);
    });
});

//GET: SINGLE PERSON
app.get("/api/people/:personId", (req, res) => {
  db.oneOrNone(getPerson, req.params.personId)
    .then(function(data) {
      // success;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(data));
    })
    .catch(function(error) {
      // error;
      console.log("error retrieving accounts", error);
    });
});

//POST: create new Person
app.post("/api/people", (req, res) => {
  const data = req.body;
  console.log(data);
  var responseMsg = "";
  var requester = "curena";
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
      console.log("person created, id: " + data.person_id); // print new person id;
      responseMsg = "Person created Successfully!";
    })
    .catch(error => {
      if (error.code == 23505) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log("PERSON ALREADY EXISTS");
        res.status(400);
        responseMsg = "This person already exists.";
      } else if (error.code == 23502) {
        //UNIQUE CONSTRAINT VIOLATION
        console.log("MISSING REQUIRED FIELD");
        res.status(400);
        responseMsg = "A required field is missing.";
      } else {
        console.log("ERROR:", error); // print error;
        res.status(400);
        responseMsg =
          "An error occurred while creating this person. Please try again later.";
      }
    })
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ response: responseMsg }));
    });
});

//PUT: update PERSON -- wip
app.put("/api/people/:pid", (req, res) => {
  const requestingUser = "curena";
  const data = { ...req.body, updated_by: requestingUser };
  let responseMsg = "";

  console.log("updating");

  // Setup the query
  let query = updatePersonByID(req.params.pid, data);
  console.log(query);
  // Turn req.body into an array of values
  var colValues = Object.keys(data).map(function(key) {
    return data[key];
  });

  db.any(query, colValues)
    .then(data => {
      console.log(data[0].person_id); // print id;
      responseMsg = "success";
    })
    .catch(error => {
      console.log("ERROR:", error); // print error;
      responseMsg = "error";
    })
    .then(() => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify({ response: responseMsg }));
    });
});

function updatePersonByID(id, cols) {
  // Setup static beginning of query
  var query = ["UPDATE people"];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  var set = [];
  Object.keys(cols).forEach(function(key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push("WHERE person_id = " + id + " RETURNING PERSON_ID");

  // Return a complete query string
  return query.join(" ");
}

//DELETE: DELETE Person
app.delete("/api/people/:personId", (req, res) => {
  db.result(deletePerson, req.params.personId)
    .then(result => {
      // success;
      // rowCount = number of rows affected by the query
      console.log(result.rowCount + " rows deleted."); // print how many records were deleted;
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({ response: result.rowCount + " rows deleted." })
      );
    })
    .catch(error => {
      // error;
      console.log("error deleting person", error);
    });
});

//------------------------------------------------------------------------//
//---------------------------------CHECK-INS------------------------------//
//------------------------------------------------------------------------//

//---------------- EVENTS ----------------------//

//---------------- LOCATIONS ----------------------//

//---------------- SHEETS ----------------------//

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
