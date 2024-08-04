// imports the connect and connection functions from mongoose library
// ODM library for MongoDB, schema based
const { connect, connection } = require('mongoose');

// connection string for MongoDB on localhost with db named 'socialDB'
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

// to connect to MongoDB using mongoose fucntion connect
connect(connectionString);

// export connection for allowing to be used to access db connection
module.exports = connection;