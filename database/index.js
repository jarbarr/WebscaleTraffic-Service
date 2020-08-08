const mysql = require('mysql');
const mysqlConfig = require('./config.js');

module.exports.connection = mysql.createConnection({
  host     : 'localhost',
  user     : mysqlConfig.mysqlUser,
  password : mysqlConfig.mysqlPW,
  database : 'calendar'
});
