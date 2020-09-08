const faker = require('faker');
const db = require('./index.js');
const moment = require('moment');
const Console = console;

// generate 1000 properties
const createProperties = (callback) => {
  // generate 1000 properties
  // example data will be 10
  /* eslint-disable */
  for (let i = 1; i <= 10; i += 1) {
    const ratingOptions = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    // generate data for a room
    let pick = Math.round(faker.random.number({ min: 0, max: 9 })); // between 3.80 and 5 (exclusive) points
    let rating = ratingOptions[pick];
    let nightly_fee;
    if (rating <= 2) {
      nightly_fee = faker.random.number({ min: 50, max: 200 }); // between 50 and 300 dollars
    } else if (rating > 2 && rating < 3.5) {
      nightly_fee = faker.random.number({ min: 200, max: 400 }); // between 50 and 300 dollars
    } else if (rating >= 3.5) {
      nightly_fee = faker.random.number({ min: 400, max: 1000 }); // between 50 and 300 dollars
    }
    let reviews = faker.random.number({ min: 5, max: 100 }); // between 5 and 300 reviews
    let minimum_stay = faker.random.number({ min: 1, max: 5 }); // between 1 and 3 nights
    let maximum_guest = faker.random.number({ min: 1, max: 5 }); // between 1 and 3 nights
    let cleaning_fee;
    let service_fee; // ranges from 50 to 100 based on rating
    if (rating >= 3) {
      service_fee = faker.random.number({ min: 80, max: 150 });
    } else if (rating < 3) {
      service_fee = faker.random.number({ min: 20, max: 80 });
    }
    cleaning_fee = 0.03 * (nightly_fee + service_fee); // 3% of subtotal

    let subtotal = nightly_fee + cleaning_fee + service_fee;

    let guests = faker.random(number({ min: 0, max: maximum_guest}));

    let queryString = `INSERT INTO properties_by_details (nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal) VALUES (${nightly_fee}, ${rating}, ${reviews}, ${minimum_stay}, ${maximum_guest}, ${cleaning_fee}, ${service_fee}, ${subtotal})`;
    // insert data into rooms table by mysql query function
    // specify database
    db.query(queryString, (error) => {
      if (error) {
        Console.log(`Failure! property ${i} not inserted into properties table: `, error, nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal );
      } else {
        Console.log(`Success! Property ${i} inserted into properties table:`, nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal);
        callback(i, minimum_stay, subtotal, guests);
      }
    });
    queryString = `INSERT INTO properties (nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal) VALUES (${nightly_fee}, ${rating}, ${reviews}, ${minimum_stay}, ${maximum_guest}, ${cleaning_fee}, ${service_fee}, ${subtotal})`;
    // insert data into rooms table by mysql query function
    // specify database
    db.query(queryString, (error) => {
      if (error) {
        Console.log(`Failure! property ${i} not inserted into properties table: `, error, nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal );
      } else {
        Console.log(`Success! Property ${i} inserted into properties table:`, nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subtotal);
        callback(i, minimum_stay, subtotal, guests);
      }
    });
  }
};

// create a function that generate 1 to 15 reservations for input roomID
//  insert into reservations table
/* eslint-disable */
let createReservations = (propertyID, minimumStay, subtotal, guests) => {
  // create an array to store the all booked_dates for the input roomID
  let dates = {};
  // generate a random number of reservations between 1 and 15 for the input roomID
  let numOfReservation = faker.random.number({ min: 5, max: 10 });
  // iterate over the number of reservations
  for (let i = 0; i < numOfReservation; i += 1) {
    let booking_id = faker.random.number({ min: 2000, max: 10000 });
    // generate a random number of stay between minimumStay and 10 for the current reservation
    let lengthOfStay = faker.random.number({ min: 0, max: 10 }) + minimumStay;
    const today = moment(new Date).format('YYYY-MM-DD');
    const days = faker.random.number({ min: 1, max: 20 })
    const months = faker.random.number({ min: 1, max: 4 })
    let addMonths = moment(today).add(months, 'months').format('YYYY-MM-DD');
    let randomDate = moment(addMonths).add(days, 'days').format('YYYY-MM-DD');
    let total = subtotal * lengthOfStay
    dates[propertyID] = [lengthOfStay, booking_id, randomDate, total, subtotal];
  }
  /* eslint-disable */
  for (let property in dates) {
    for (let j = 0; j < dates[property][0]; j += 1) {

      let sum = dates[property][3]
      let booking = dates[property][2];
      let last = booking;
      booking = moment(last).add(j, 'days').format('YYYY-MM-DD');
      let rez = dates[property][1];

      // declare query string
      let queryString = `INSERT INTO reservations (booking_id, property_id, booked_date, total) VALUES (${rez}, ${property}, '${booking}', ${sum})`;
      db.query(queryString, (error) => {
        if (error) {
          Console.log(`Failed to insert data to reservations table where property_id = ${property}: `, error, property, rez, booking, typeof(booking));
        } else {
          Console.log(`Success to insert data to reservations table where property_id = ${property}`);
        }
      });
    }
  }
};

// invoke generateRooms function
createProperties(createReservations);
// createReservations();