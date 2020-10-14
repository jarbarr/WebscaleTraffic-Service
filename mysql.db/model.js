const moment = require('moment');
const db = require('./index.js');

const Console = console;

module.exports = {
  getProperties: (req, callback) => {
    // declare query string
    Console.log(req);
    const queryString = 'SELECT properties.nightly_fee, properties.rating, properties.reviews, properties.minimum_stay, properties.maximum_guest, reservations.id, reservations.booked_date FROM properties, reservations WHERE properties.property_id = ? AND properties.property_id = reservations.property_id ORDER BY reservations.booked_date;';
    // declare query params
    const queryParams = [req.property_id];
    // get all the informations and reservations of a specify room with the room_id from endpoint
    db.query(queryString, queryParams, ((err, results) => {
      if (err) {
        Console.error(err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    }));
  },
  addReservation: (req, callback) => {
    // get the check_in date from request
    const check_in = moment(req.check_in);
    // get the check_out date from request
    const check_out = moment(req.check_out);
    // create a list of dates in YYYY-MM-DD format from the check_in date   to the check_out date
    const dates = [];
    for (let i = check_in; i <= check_out; check_in.add(1, 'days')) {
      dates.push(check_in.format('YYYY-MM-DD'));
    }
    // iterate over the dates array
    for (let i = 0; i < dates.length; i++) {
      // declare query string
      const queryString = 'INSERT INTO reservations (room_id, booked_date) VALUES (?, ?)';
      // declare query params
      const queryParams = [req.params.room_id, dates[i]];
      /* insert current date into reservations table where room_id equal to room_id from endpoint */
      db.query(queryString, queryParams, (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          // Console.log('post successful!');
          callback(null, results);
        }
      });
    }
  },
  updateReservation: (req, callback) => {
    // get the check_in date from request
    const checkIn = moment(req.check_in);
    // get the check_out date from request
    const checkOut = moment(req.check_out);
    // get id from request
    const id = req.reservation.id;
    // create a list of dates in YYYY-MM-DD format from the check_in date   to the check_out date
    const dates = [];
    for (let i = check_in; i <= check_out; check_in.add(1, 'days')) {
      dates.push(check_in.format('YYYY-MM-DD'));
    }
    // iterate over the dates array
    for (let i = 0; i < dates.length; i++) {
      // declare query string
      const queryString = `UPDATE reservations SET (booked_date) VALUES (?) WHERE id = ${id} `;
      db.query(queryString, (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  },
  deleteReservation: (req, callback) => {
    const id = req.reservation.id;
    const queryString = `DELETE FROM reservations WHERE id = ${id} `;
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};
