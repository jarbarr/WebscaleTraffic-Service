const fs = require('fs');
const moment = require('moment');
const faker = require('faker');
// const data = require('./dataGenerator.js');
// const readline = require('readline');

/* eslint-disable */
function writeProperties(n, stream, encoding, callback) {
  // start iteration at number n which will eventually be 10m
  let i = n;
  //
  let id = 0;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
// =============================================================================
    //                               Data Generator                            //
// =============================================================================
      const ratingOptions = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      let pick = Math.round(faker.random.number({ min: 0, max: 9 })); // between 3.80 and 5 (exclusive) points
      // generate rating
      let rating = ratingOptions[pick];
      let nightly_fee;
      if (rating <= 2) {
        nightly_fee = faker.random.number({ min: 20, max: 80 }); // between 50 and 300 dollars
      } else if (rating > 2 && rating < 3.5) {
        nightly_fee = faker.random.number({ min: 80, max: 150 }); // between 50 and 300 dollars
      } else if (rating >= 3.5) {
        nightly_fee = faker.random.number({ min: 150, max: 300 }); // between 50 and 300 dollars
      }
      let reviews = faker.random.number({ min: 5, max: 100 }); // between 5 and 300 reviews
      let minimum_stay = faker.random.number({ min: 1, max: 5 }); // between 1 and 3 nights
      let maximum_guest = faker.random.number({ min: 1, max: 5 }); // between 1 and 3 nights
      let cleaning_fee;
      let service_fee; // ranges from 50 to 100 based on rating
      if (rating >= 3) {
        service_fee = Math.round(faker.random.number({ min: 60, max: 100 }));
      } else if (rating < 3) {
        service_fee = Math.round(faker.random.number({ min: 20, max: 60 }));
      }
      cleaning_fee = Math.round(0.03 * (nightly_fee + service_fee)); // 3% of subtotal

      let subTotal = nightly_fee + cleaning_fee + service_fee;

      let possibleReservations = [1, 3, 5, 2, 4, 7, 10, 20, 50];

      let choice = faker.random.number({ min: 0, max: 8 });

      let numOfReservations = possibleReservations[choice];

      // generate a random number of reservations per property
      // let numOfReservations = faker.random.number({ min: 1, max: 3 });
      // iterate over each reservation
      for (let j = 0; j < numOfReservations; j += 1) {
        // console.log(id)
        // generate a random reservation id per reservation
        // let reservation_id = faker.random.number({ min: 10000, max: 20000 });
        let reservation_id = j;
        // generate randomDate per reservation
        let today = moment(new Date).format('YYYY-MM-DD');
        let days = faker.random.number({ min: 1, max: 30 });
        // const months = faker.random.number({ min: 1, max: 2 });
        if (j > 0) {
          today = moment(today).add(j, 'months').format('YYYY-MM-DD');
        }
        // let addMonths = moment(today).add(months, 'months').format('YYYY-MM-DD');
        let checkinDate = moment(today).add(days, 'days').format('YYYY-MM-DD');
        // generate length of stay per reservation
        let lengthOfStay = faker.random.number({ min: 1, max: 5 }) + minimum_stay;
        let checkoutDate = moment(checkinDate).add(lengthOfStay, 'days').format('YYYY-MM-DD');
        // generate total per reservation
        let total = subTotal * lengthOfStay;
        // generate number of guests per reservation
        let guests = faker.random.number({ min: 0, max: maximum_guest });

        // create a string for the write stream
        let propertiesData = `${id},${reservation_id},${checkinDate},${checkoutDate},${cleaning_fee},${guests},${maximum_guest},${minimum_stay},${nightly_fee},${rating},${reviews},${service_fee},${subTotal},${total}\n`
        // return datastring and export it

        if (i === 0) {
          stream.write(propertiesData, encoding, callback);
        } else {
          ok = stream.write(propertiesData, encoding);
        }
      }

// ==================================================================================
//                          end of data generator                                  //
// ================================================================================


    } while (i > 0 && ok);
    if (i > 0) {
      stream.once('drain', write);
    }
  }
  write();
};


const writeStream = fs.createWriteStream('./cass.csv');

writeStream.write('property_id,reservation_id,checkin_date,checkout_date,cleaning_fee,guests,maximum_guests,minimum_stay,nightly_fee,rating,reviews,service_fee,subtotal,total\n','ascii');

writeProperties(5, writeStream, 'ascii', () => {
  writeStream.end();
});

