// importing express framework - which is used to build web apps and API's 
const express = require('express')
// importing database connection from config folder/connection js file
const db = require('./config/connection');
const routes = require('./routes');
// setting port for server to listen on
const PORT = process.env.PORT || 3001;
// creates an instance of an EXPRESS app
const app = express()
// MIDDLEWARE function parses incoming requests
app.use(express.urlencoded({ extended: true }));
// express function that parses incoming requests to JSON
app.use(express.json());
// set up for imported routes MIDDLEWARE, for route handlings req 
app.use(routes); 

// connect to mongo and start server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });