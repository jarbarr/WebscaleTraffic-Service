// const postgres = require('postgres');
/* eslint-disable */
const { Client } = require('pg');
// const config = require('./config.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-54-219-178-199.us-west-1.compute.amazonaws.com',
  database: 'calendar',
  password: 'queercoder',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows[0].now)
  })
})


// const client = new Client({
//   user: 'postgres',
//   host: 'ec2-54-219-178-199.us-west-1.compute.amazonaws.com',
//   database: 'calendar',
//   password: 'queercoder',
//   port: 5432,
// });

// client.connect((err) => {
//   if (err) {
//     Console.log(err);
//   } else {
//     Console.log('connected to postgres!');
//   }
// });

module.exports = pool;

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
