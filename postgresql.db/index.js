// const postgres = require('postgres');
const { Client } = require('pg');
// const config = require('./config.js');

const Console = console;

const client = new Client({
  user: 'jarbarr',
  host: 'localhost',
  database: 'calendar',
  password: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    Console.log(err);
  } else {
    Console.log('connected to postgres!');
  }
});

module.exports = client;

// ==============================================================
// For Connecting to Postgres Directly rather than through

// const sql = postgres({
//   host        : '',         // Postgres ip address or domain name
//   port        : 5432,       // Postgres server port
//   path        : '',         // unix socket path (usually '/tmp')
//   database    : 'ca',         // Name of database to connect to
//   username    : 'jarbarr',         // Username of database user
//   password    : ''         // Password of database user
//   ssl         : false,      // True, or options for tls.connect
//   max         : 10,         // Max number of connections
//   timeout     : 0,          // Idle connection timeout in seconds
//   types       : [],         // Array of custom types, see more below
//   onnotice    : fn,          // Defaults to console.log
//   onparameter : fn,          // (key, value) when server param change
//   debug       : fn,          // Is called with (connection, query, parameters)
//   transform   : {
//     column            : fn, // Transforms incoming column names
//     value             : fn, // Transforms incoming row values
//     row               : fn  // Transforms entire rows
//   },
// });
