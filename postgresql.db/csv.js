const fs = require('fs');
const moment = require('moment');
const faker = require('faker');
// const csvWriter = require('csv-write-stream');

// const writer = csvWriter();

const Console = console;

// const writer = csvWriter({
//   separator: ',',
//   newline: '\n',
//   headers: undefined,
//   sendHeaders: true,
// });
/* eslint-disable */
// --------properties table--------
// layout: id is incremented, [nightly_fee, rating, review, min_stay, max_guests]
// create 10 properties
// set nighly fee largeNumber
// set rating smallNumber
// set total reviews largeNUmber
// set minumum stay smallNumber
// set max_guests smallNumber

function writeProperties() {
  let propertiesData = 'property_id, nightly_fee, rating, reviews, minimum_stay, maximum_guests, cleaning_fee, service_fee, subtotal \n';

  let properties_minimumStay = [];
  let properties_subTotal = [];
  let properties_guests = [];
  // let large = [25, 23, 45, 98, 14, 19, 91, 72, 83, 95];
  // let small = [1, 2, 3, 4, 5];

  // let nightly_fee = largeNumber[i % 10];
  // let rating = smallNumber[i % 5];
  // let reviews = largeNumber[i % 10];
  // let minimum_stay = smallNumber[i % 5];
  // let maximum_stay = smallNumber[i % 5];
  // let cleaning_fee = smallNumber[i % 5];
  // let service_fee = smallNumber[i % 5];
  // let subTotal = nightly_fee + service_fee + cleaning_fee;
  // let guests = smallNumber[i % 5];

  // iterate over the number of properties
  for (let i = 0; i < 10000000; i += 1) {
    const ratingOptions = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    let pick = Math.round(faker.random.number({ min: 0, max: 9 })); // between 3.80 and 5 (exclusive) points
    // generate rating
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
      service_fee = Math.round(faker.random.number({ min: 80, max: 150 }));
    } else if (rating < 3) {
      service_fee = Math.round(faker.random.number({ min: 20, max: 80 }));
    }
    cleaning_fee = Math.round(0.03 * (nightly_fee + service_fee)); // 3% of subtotal

    let subTotal = nightly_fee + cleaning_fee + service_fee;




    propertiesData += `${i}, ${nightly_fee}, ${rating}, ${reviews}, ${minimum_stay}, ${maximum_guest}, ${cleaning_fee}, ${service_fee}, ${subTotal} \n`;

    properties_minimumStay.push(minimum_stay);
    properties_subTotal.push(subTotal);
    properties_guests.push(maximum_guest);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile('./properties.csv', propertiesData, (err) => {
      if (err) {
        // Console.log(err);
        reject(err);
      } else {
        //  Console.log(data);
        resolve({array1: properties_minimumStay, array2: properties_subTotal, array3: properties_guests});
      }
    });
  });
};

// --------reservations table--------
// layout: id is incremented, [property_id, reservation_id, booked_date]
function writeReservations(array1, array2, array3) {
  let reservationsData = `booking_id, property_id, booked_date, total, guests \n`;



  // let currentDate = moment().format('YYYY-MM-DD');
  // let lengthOfStay = 6
  // let lastDate = moment(currentDate).add(numOfStay, 'days').format('YYYY-MM-DD');
  for (let i = 0; i < array1.length; i += 1) {
    // generate a random number of reservations per property
    let numOfReservations = faker.random.number({ min: 2, max: 5 });
    // iterate over each reservation
    for (let j = 0; j < numOfReservations; j += 1) {
      // generate a random booking id per reservation
      let booking_id = faker.random.number({ min: 10000, max: 20000 });
      // generate randomDate per reservation
      const today = moment(new Date).format('YYYY-MM-DD');
      const days = faker.random.number({ min: 1, max: 20 });
      const months = faker.random.number({ min: 1, max: 4 });
      let addMonths = moment(today).add(months, 'months').format('YYYY-MM-DD');
      let randomDate = moment(addMonths).add(days, 'days').format('YYYY-MM-DD');
      // generate length of stay per reservation
      let lengthOfStay = faker.random.number({ min: 1, max: 10 }) + array1[i];
      // generate total per reservation
      let total = array2[i] * lengthOfStay;
      // generate number of guests per reservation
      let guests = faker.random.number({ min: 0, max: array3[j] });
      // iterate over each day of each reservation
      for (let k = 0; k < lengthOfStay; k += 1) {
        // generate a booked date for each day
        let bookedDate = moment(randomDate).add(k, 'days').format('YYYY-MM-DD');
        // write each data point to the file
        reservationsData += `${booking_id}, ${j}, ${bookedDate}, ${total}, ${guests}\n`;
      }
    }
  }

  return new Promise((resolve, reject) => {
    fs.writeFile('./reservations.csv', reservationsData, (err, data) => {
      if (err) {
        // Console.log(err);
        reject(err);
      } else {
        // Console.log(data);
        resolve(data);
      }
    });
  });
}

let writeFiles = () => {
  writeProperties()
    .then(({ array1, array2, array3 }) => {
      writeReservations(array1, array2, array3);
    })
    .catch((error) => {
      Console.log('error', error);
    });
};

writeFiles();
