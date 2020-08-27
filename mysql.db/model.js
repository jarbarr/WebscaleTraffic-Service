const moment = require('moment');
const db = require('./index.js');

const Console = console;

module.exports = {
  getRooms: (req, callback) => {
    // declare query string
    const queryString = 'SELECT rooms.nightly_fee, rooms.rating, rooms.reviews, rooms.minimum_stay, rooms.maximum_guest, reservations.id, reservations.booked_date FROM rooms, reservations WHERE rooms.id = ? AND rooms.id = reservations.room_id ORDER BY reservations.booked_date;';
    // declare query params
    const queryParams = [req.room_id];
    // get all the informations and reservations of a specify room with the room_id from endpoint
    db.query(queryString, queryParams, ((err, results) => {
      if (err) {
        Console.error(err);
        callback(err, null);
      } else {
        // Console.log('here is data from db!');
        callback(null, results);
      }
    }));
  },
  postRooms: (req, callback) => {
    // get the check_in date from request
    const check_in = moment(req.body.check_in);
    // get the check_out date from request
    const check_out = moment(req.body.check_out);
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
};
