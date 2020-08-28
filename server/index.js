// ============================================================ //
// Dependency
//  ----------------------------------------------------------- //
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const mysql = require('../mysql.db/model.js');
const pgdb = require('../postgresql.db/model.js');
const cassandra = require('../cassandra.db/index.js');

const app = express();
const PORT = 3002;
const publicPath = path.join(__dirname, '/../public');
const Console = console;

// ============================================================ //
// Middleware
//  ----------------------------------------------------------- //
app.use('/properties/:property_id', bodyParser.json());
app.use('/properties/:property_id', bodyParser.urlencoded({ extended: true }));
app.use('/properties/:property_id', expressStaticGzip(publicPath, {
  enableBrotli: true,
  orderPreference: ['br'],
}));

// ============================================================ //
// Routes
//  ----------------------------------------------------------- //
// GET request to '/properties/:property_id/reservation' route
app.get('/properties/:property_id/reservations', (req, res) => {
  mysql.getProperties(req.params, (err, results) => {
    if (err) {
      // Console.log('Failed to get data from databases: ', err);
      // Console.log(':*(');
      res.status(404).send(err);
    } else {
      // Console.log('Succeed to get data from databases', results);
      // Console.log('get works :*) ');
      res.status(200).send(results);
    }
  });
});

// POST request to '/properties/:property_id/reservation' route
app.post('/properties/:property_id/reservations', (req, res) => {
  mysql.addReservation(req.body, (err) => {
    Console.log(req.body);
    if (err) {
      // Console.log(`Failed to insert data to
      //  reservations table where property id = ${req.params.property_id}:`, err);
      // Console.log('post no work');
      res.status(400).send(err);
    } else {
      // Console.log(`Success to insert data
      // to reservations table where property id = ${req.params.property_id}`);
      // Console.log('post works', results);
      res.status(201).send();
    }
  });
});
app.put('/properties/:property_id/reservations/:reservation_id', (req, res) => {
  mysql.updateReservation(req.body, (err) => {
    // Console.log(req.body);
    if (err) {
      // Console.log(`Failed to insert data to
      //  reservations table where property id = ${req.params.property_id}:`, err);
      // Console.log('post no work');
      res.status(400).send(err);
    } else {
      // Console.log(`Success to insert data
      // to reservations table where property id = ${req.params.property_id}`);
      // Console.log('post works', results);
      res.status(200).send();
    }
  });
});
app.delete('/properties/:property_id/reservations/:reservation_id', (req, res) => {
  mysql.deleteReservation(req.body, (err) => {
    // Console.log(req.body);
    if (err) {
      // Console.log(`Failed to insert data to
      //  reservations table where property id = ${req.params.property_id}:`, err);
      // Console.log('post no work');
      res.status(405).send(err);
    } else {
      // Console.log(`Success to insert data
      // to reservations table where property id = ${req.params.property_id}`);
      // Console.log('post works', results);
      res.status(202).send();
    }
  });
});

// ============================================================ //
// Start server
//  ----------------------------------------------------------- //
app.listen(PORT, () => {
  Console.log(`listening on port ${PORT}`);
});
