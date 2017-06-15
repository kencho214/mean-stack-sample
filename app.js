"use strict";

// set up
const express = require("express");					// web app framework
const app = express();								// create app with express
const mongoose = require("mongoose"); 				// mongoose for mongodb
const port = process.env.PORT || 8080; 				// service port
const database = require("./config/database"); 		// database config
const morgan = require("morgan");						// logger
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// configuration 
mongoose.connect(database.localUrl); 	// Connect to MongoDB

app.use(express.static("./public")); 	// set the static files location /public/img will be /img for users
app.use(morgan("dev"));					// log every request to the console
app.use(bodyParser.urlencoded({ "extended": "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 			// parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(methodOverride("X-HTTP-Method-Override")); // override with the X-HTTP-Method-Override header in the request

// routes
require("./app/routes")(app);

// start listening
app.listen(port, () => {
    console.log("App listening on port " + port);
});
