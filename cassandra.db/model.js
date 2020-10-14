const moment = require('moment');
const cass = require('./index.js');

/* eslint-disable */
module.exports = {
  getProperties: (req, callback) => {
    // declare query string
    const queryString = `select * from reservations_by_id where property_id = ${req.property_id}`;
    cass.execute(queryString, ((err, results) => {
      if (err) {
        console.error('model:', err);
        callback(err, null);
      } else {
        console.log('here is data from db!');
        callback(null, results);
      }
    }));
  },
  addReservation: (req, callback) => {
    // get the check_in date from request
    const check_in = moment(req.body.check_in);
    // get the check_out date from request
    const check_out = moment(req.body.check_out);
    // declare query string

    const queryString = `INSERT INTO calendar.reservations_by_id (property_id, checkin_date, checkout_date, guests, total) VALUES (${req.body.property_id}, ${req.body.check_in}, ${req.body.check_out}, ${req.body.guests}, ${req.body.total})`;
    /* insert current date into reservations table where room_id equal to room_id from endpoint */
    cass.execute(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};
