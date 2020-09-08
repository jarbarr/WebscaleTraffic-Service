const moment = require('moment');
const db = require('./index.js');

const Console = console;
/* eslint-disable */
module.exports = {
  getProperties: (req, callback) => {
    // declare query string
    const queryString = `SELECT * from properties, reservations where properties.property_id = ${req.property_id} AND properties.property_id = reservations.property_id ORDER BY properties.property_id;`;
    // declare query params
    // const queryParams = [req.property_id];
    // get all the informations and reservations of a specify room with the room_id from endpoint
    db.query(queryString, ((err, results) => {
      if (err) {
        Console.error(err);
        callback(err, null);
      } else {
        // Console.log('here is data from db!');
        callback(null, results);
      }
    }));
  },
  addReservation: (req, callback) => {
    // console.log(req);
    // get the check_in date from request
    const check_in = moment(req.check_in).format('YYYY-MM-DD');
    // get the check_out date from request
    const check_out = moment(req.check_out).format('YYYY-MM-DD');
    // declare query string
    const queryString = `INSERT INTO reservations (property_id, reservation_id, checkin_date, checkout_date, guests, total) VALUES (${req.property_id}, ${req.reservation_id}, '${check_in}', '${check_out}', ${req.guests}, ${req.total})`;
    // const queryString = `INSERT INTO reservations (property_id, checkin_date, checkout_date) VALUES (${req.property_id}, '${check_in}', '${check_out}')`;
    /* insert current date into reservations table where room_id equal to room_id from endpoint */
    db.query(queryString, (err, results) => {
      if (err) {
        console.log('error:', err);
        callback(err, null);
      } else {
        console.log('results:', results);
        callback(null, results);
      }
    });
  },
  updateReservation: (req, callback) => {
    const queryString = `UPDATE reservations SET check_in = ${reservation.checkIn}, check_out = ${reservation.checkOut} WHERE id = ${reservation.id} `;
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  deleteReservation: (req, callback) => {
    const queryString = `DELETE FROM reservations WHERE id = ${reservation.id} `;
    db.query(queryString, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
};
