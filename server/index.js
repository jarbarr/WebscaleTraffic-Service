// ============================================================ //
// Dependency
//  ----------------------------------------------------------- //
/* eslint-disable */
const newrelic = require('newrelic')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
// const mysql = require('../mysql.db/model.js');
const pgdb = require('../postgresql.db/model.js');
// const cassandra = require('../cassandra.db/index.js');
const controllers = require('./controllers.js');

const app = express();
const PORT = 9042;
const publicPath = path.join(__dirname, '/../public');

// ============================================================ //
// Middleware
// ----------------------------------------------------------- //
app.use('/properties/:property_id/', bodyParser.json());
app.use('/properties/:property_id/', bodyParser.urlencoded({ extended: true }));
app.use('/properties/:property_id/', expressStaticGzip(publicPath, {
  enableBrotli: true,
  orderPreference: ['br'],
}));

// ============================================================ //
// Routes
// ------------------------------------------------------------- //

// GET request to '/properties/:property_id/reservation' route
app.get('/properties/:property_id/reservations', (req, res) => { controllers.getProperty(req, res) });

// POST request to '/properties/:property_id/reservation' route
app.post('/properties/:property_id/reservations', (req, res) => { controllers.addReservation(req, res) });

app.put('/properties/:property_id/reservations/:reservation_id', (req, res) => { controllers.updateReservation(req, res) });

app.delete('/properties/:property_id/reservations/:reservation_id', (req, res) => { controllers.deleteReservation(req, res) });

// ============================================================ //
// Start server
//  ----------------------------------------------------------- //
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
