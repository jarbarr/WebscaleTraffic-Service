// Dependency
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// Route
// GET request to '/rooms/:room_id/reservation' route
app.get('/rooms/:room_id/reservation', (req, res) => {
  // get all the informations and reservations of a specify room with the room_id from the endpoint
  let queryString = 'SELECT rooms.nightly_fee, rooms.rating, rooms.reviews, rooms.minimum_stay, rooms.maximum_guest, reservations.id, reservations.booked_date FROM rooms, reservations WHERE rooms.id = ? AND rooms.id = reservations.room_id ORDER BY reservations.booked_date;';
  // get the room_id from the endpoint
  let queryParams = [req.params.room_id];
  // invoke query function
  db.connection.query(queryString, queryParams, function(error, results, fields){
    if (error) {
      console.log("Failed to get data from databases: ", error);
      res.status(404).send(error);
    } else {
      console.log("Succeed to get data from databases");
      res.status(200).send(results);
    }
  });
});

// POST request to '/rooms/:room_id/reservation' route
// app.post('/rooms/:room_id/reservation', (req, res) => {});

// Start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
