// ============================================================ //
// Dependency
//  ----------------------------------------------------------- //
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const model = require('../mysql.db/model.js');

const app = express();
const PORT = 3002;
const publicPath = path.join(__dirname, '/../public');
const Console = console;

// ============================================================ //
// Middleware
//  ----------------------------------------------------------- //
app.use('/rooms/:room_id', bodyParser.json());
app.use('/rooms/:room_id', bodyParser.urlencoded({ extended: true }));
app.use('/rooms/:room_id', expressStaticGzip(publicPath, {
  enableBrotli: true,
  orderPreference: ['br'],
}));

// ============================================================ //
// Routes
//  ----------------------------------------------------------- //
// GET request to '/rooms/:room_id/reservation' route
app.get('/rooms/:room_id/reservation', (req, res) => {
  model.getRooms(req.params, (err, results) => {
    if (err) {
      // Console.log('Failed to get data from databases: ', err);
      Console.log(':*(');
      res.status(404).send(err);
    } else {
      // Console.log('Succeed to get data from databases', results);
      // Console.log('get works :*) ');
      res.status(200).send(results);
    }
  });
});

// POST request to '/rooms/:room_id/reservation' route
app.post('/rooms/:room_id/reservation', (req, res) => {
  model.postRooms(req, (err) => {
    Console.log(req.body);
    if (err) {
      // Console.log(`Failed to insert data to
      //  reservations table where room id = ${req.params.room_id}:`, err);
      // Console.log('post no work');
      res.status(418).send(err);
    } else {
      // Console.log(`Success to insert data
      // to reservations table where room id = ${req.params.room_id}`);
      // Console.log('post works', results);
      res.status(201).send();
    }
  });
});

// ============================================================ //
// Start server
//  ----------------------------------------------------------- //
app.listen(PORT, () => {
  Console.log(`listening on port ${PORT}`);
});
