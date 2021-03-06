var express = require("express");
var app = express();
var path = require('path');

var cfenv = require("cfenv");
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');


// Use handelbars for view
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

/* Routing */
var index = require('./routes/index');
var ttn = require('./routes/ttn');

// var users = require('./routes/users');
var toon = require('./routes/toon');
var sensors = require('./routes/sensors');
var sensor1 = require('./routes/sensor1');
var sensor2 = require('./routes/sensor2');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

app.use('/ttn', ttn);
app.use('/toon', toon);
app.use('/sensor1', sensor1);
app.use('/sensor2', sensor2);
app.use('/sensors', sensors);

var mydb;
var mydb2;

/* Endpoint to greet and add a new visitor to database.
 * Send a POST request to localhost:3000/api/visitors with body
 * {
 * 	"name": "Bob"
 * }
 */
app.post("/api/visitors", function (request, response) {
  var userName = request.body.name;
  if (!mydb) {
    console.log("No database.");
    response.send("Hello " + userName + "!");
    return;
  }
  // insert the username as a document
  mydb.insert({"name": userName}, function (err, body, header) {
    if (err) {
      return console.log('[mydb.insert] ', err.message);
    }
    response.send("Hello " + userName + "! I added you to the database.");
  });
});

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/visitors", function (request, response) {
  var names = [];
  if (!mydb) {
    response.json(names);
    return;
  }

  mydb.list({include_docs: true}, function (err, body) {
    if (!err) {
      body.rows.forEach(function (row) {
        console.log(row.doc.payload);
        if (row.doc.payload)
          names.push(row.doc.payload);
      });
      response.json(names);
    }
  });
});

app.get("/api/sensor1/data", function (request, response) {
  var names = [];
  if (!mydb2) {
    response.json(names);
    return;
  }

  mydb2.list({include_docs: true}, function (err, body) {
    if (!err) {
      body.rows.forEach(function (row) {
        if (row)
          names.push(row.doc);
      });
      response.json(names);
    }
  });
});

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) {
}

const appEnvOpts = vcapLocal ? {vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

  //database name
  var dbName = 'ttndatadummy';

  var dbName2 = 'toondata';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function (err, data) {
    if (!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);

  mydb2 = cloudant.db.use(dbName2);

}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));


var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

module.exports = app;

