const mysql = require('mysql');
const config = require('./config.js');

const Console = console;

const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.pw,
  database: 'calendar',
});

connection.connect((err) => {
  if (err) {
    Console.log(err);
  } else {
    Console.log('connected to mysql!');
  }
});

module.exports = connection;

// For docker network
// module.exports.connection = mysql.createConnection({
//   host     : '172.17.0.2',
//   user     : 'root',
//   database : 'calendar',
//   port     : '3306'
// });
