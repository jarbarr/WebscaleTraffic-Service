const moment = require('moment');
const faker = require('faker');
const db = require('./index.js');

const Console = console;

// let date = `${faker.date.weekday()}`;
// let nightly_fee = `${faker.random.number({'min':, 'max': })}`;

// generate 1000 properties
const createProperties = () => {
  // generate 1000 properties
  // example data will be 10
  for (let i = 1; i <= 10; i += 1) {
    const ratingOptions = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    // generate data for a room
    let nightly_fee = `${faker.random.number({ min: 100, max: 500 })}`; // between 50 and 300 dollars
    let pick = `${faker.random.number({ min: 1, max: 9 })}`; // between 3.80 and 5 (exclusive) points
    let rating = ratingOptions[pick];
    let reviews = `${faker.random.number({ min: 5, max: 100 })}`; // between 5 and 300 reviews
    let minimum_stay = `${faker.random.number({ min: 3, max: 5 })}`; // between 1 and 3 nights
    let maximum_guest = `${faker.random.number({ min: 0, max: 5 })}`; // between 1 and 3 nights
    let cleaning_fee;
    let service_fee; // ranges from 50 to 100 based on rating
    if (rating > 3) {
      service_fee = `${faker.random.number({ min: 80, max: 150 })}`;
    } else {
      service_fee = `${faker.random.number({ min: 20, max: 80 })}`;
    }
    cleaning_fee = (0.03) * (nightly_fee + service_fee); // 3% of subtotal
    // if (nightly_fee <= 200) {
    //   minimum_stay = `${faker.random.number({ min: 3, max: 5 })}`;
    // } else if (nightly_fee > 350 ) {
    //   maximum_guest = Math.floor(Math.random() * 5) + 2;
    // } else {
    //   // set maximum guest to 2 and 8
    //   maximum_guest = Math.floor(Math.random() * 7) + 2;
    // }
    // declare query string
    const queryString = `INSERT INTO properties (nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee) VALUES (${nightly_fee}, ${rating}, ${reviews}, ${minimum_stay}, ${maximum_guest}, ${cleaning_fee}, ${service_fee})`;
    // insert data into rooms table by mysql query function
    // specify database
    db.query(queryString, (error) => {
      if (error) {
        Console.log(`Failed to insert property ${i} to properties table: `, error, service_fee);
      } else {
        Console.log(`Succeed to insert property ${i} to properties table`);
        // callback(i, minimum_stay);
      }
    });
  }
};

// // create a function that generate 1 to 15 reservations for input roomID
// //  insert into reservations table
// let generateReservations = (roomID, minimumStay) => {
//   // create an array to store the all booked_dates for the input roomID
//   let dates = [];
//   // generate a random number of reservations between 1 and 15 for the input roomID
//   let numOfReservation = Math.floor(Math.random() * 15) + 1;
//   // iterate over the number of reservations
//   for (let i = 0; i < numOfReservation; i++) {
//     // generate a random booked_date that between today
//     // and next 180 days for the current reservation
//     // Math.random() * (max - min)) + min -> Math.random() * (Day after half year - Today)) + Today
//     let dateAfterHalfYear = new Date(moment().add(180, 'days'));
//     let booked_date = new Date(Math.random() * (moment(dateAfterHalfYear) - moment()) + moment());
//     // convert the booked_date format to the proper format of a DATE in MySQL database: YYYY-MM-DD
//     booked_date = moment(booked_date).format('YYYY-MM-DD');
//     // while the booked_date is already exist in the dates array
//     while (dates.includes(booked_date)) {
//       // regenerate and convert a random booked_date that between today
//       //  and next 180 days for the current reservation
//       booked_date = moment(new Date(Math.random() * (moment(dateAfterHalfYear) - moment()) + moment())).format('YYYY-MM-DD');;
//     }
//     // generate a random number of stay between minimumStay and 10 for the current reservation
//     let numOfStay = Math.floor(Math.random() * (10 - minimumStay + 1)) + minimumStay;
//     // iterate over the number of stay
//     for (let j = 0; j < numOfStay; j++) {
//       // push the booked_date to the dates array
//       dates.push(booked_date);
//       // add one day to the booked_date
//       booked_date = moment(booked_date).add(1, 'days').format('YYYY-MM-DD');
//     }
//   }
//   // After get all booked dates for this the input roomID, iterate over the dates array
//   for (let i = 0; i < dates.length; i++) {
//     // declare query string
//     let queryString = 'INSERT INTO reservations (room_id, booked_date) VALUES (?, ?)';
//     // declare query params
//     let queryParams = [roomID, dates[i]];
//     // insert current date into reservations table where room_id
//     //  is equal to the input roomID by mysql query function
//     db.query(queryString, queryParams, (error, results, fields) => {
//       if (error) {
//         console.log(`Failed to insert data to reservations table where room id = ${roomID}: `, error);
//       } else {
//         console.log(`Success to insert data to reservations table where room id = ${roomID}`);
//       }
//     });
//   }
// };

// invoke generateRooms function
createProperties();
// createReservations();