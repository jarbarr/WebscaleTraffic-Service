// const mysql = require('mysql');
const cassandra = require('cassandra-driver');
// const ExpressCassandra = require('express-cassandra');

const Console = console;

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  protocolOptions: { port: 9042 },
  localDataCenter: 'datacenter1',
  keyspace: 'calendar',
});

client.connect((err) => {
  if (err) {
    Console.log(err);
  } else {
    Console.log('connected to cassandra!');
  }
});

// ============================================================ //
// Express Cassandra ORM - Optional
//  ----------------------------------------------------------- //
// const models = ExpressCassandra.createClient({
//   clientOptions: {
//     contactPoints: ['127.0.0.1'],
//     protocolOptions: { port: 9042 },
//     keyspace: 'calendar',
//     queryOptions: { consistency: ExpressCassandra.consistencies.one }
//   },
//   ormOptions: {
//     defaultReplicationStrategy: {
//       class: 'SimpleStrategy',
//       replication_factor: 1,
//     },
//     migration: 'safe',
//   },
// });

// const Calendar = models.loadSchema('Person', {
//   fields: {
//     name: 'text',
//     surname: 'text',
//     age: 'int',
//     created: 'timestamp',
//   },
//   key: ['name'],
// });

// const config = require('./config.js');

// client.execute('select key from system.local', (err, result) => {
//   if (err) {
//     Console.log(err);
//   } else {
//     Console.log('connected to Cassandra', result.rows[0]);
//   }
// });

module.exports = client;
