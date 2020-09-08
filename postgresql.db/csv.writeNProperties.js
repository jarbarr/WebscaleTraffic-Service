const fs = require('fs');
const faker = require('faker');
// const faker = require('faker');
const property = require('./csv.writeProperties.js');
const reservations = require('./csv.writeReservations.js');
// const readline = require('readline');

/* eslint-disable */
// Outter most function initiating series of writestream callbacks
function writeNProperties(n, writer, encoding, callback, func) {
  // start iteration at number n which will eventually be 10m
  let i = n;
  //
  let id = 0;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      let propertiesObj = property.writeProperties(id);
      let propertiesData = `${propertiesObj.id},${propertiesObj.nightly_fee},${propertiesObj.rating},${propertiesObj.reviews},${propertiesObj.minimum_stay},${propertiesObj.maximum_guest},${propertiesObj.cleaning_fee},${propertiesObj.service_fee},${propertiesObj.subTotal}\n`;

      let passedValues = { minStay: propertiesObj.minimum_stay, maxGuest: propertiesObj.maximum_guest, subTotal: propertiesObj.subTotal }

      // =======================================================
      // invoke write Reservations for each property
      // =======================================================
      // generate semi random number of reservations
      let possibleReservations = [1, 3, 5, 2, 4, 7, 10, 15, 50];
      let choice = faker.random.number({ min: 0, max: 8 });
      let numOfReservations = possibleReservations[choice];
      // iterate across number of reservations
      for (let j = 0; j < numOfReservations; j += 1) {
        func(i, j, id, passedValues, writeReservations, numOfReservations, 'ascii', () => {
          writeReservations.end();
        });
      }




      // =========================================================
      if (i === 0) {
        writer.write(propertiesData, encoding, callback);
      } else {
        ok = writer.write(propertiesData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};


// create the write Reservations stream
const writeReservations = fs.createWriteStream('./reservations.csv');
writeReservations.write('reservation_id, reservationNum, property_id,checkin_date,checkout_date,total,guests\n');

// create the writeNProperties definition
const writeProperties = fs.createWriteStream('./psqlproperties.csv');
// writeProperties is the nested funciton object that with a write property that sets headers and controls the stream
writeProperties.write('property_id,nightly_fee,rating,reviews,minimum_stay,maximum_guests,cleaning_fee,service_fee,subtotal\n', 'ascii');
// set the value to 10m, add the write function object, the encoding and the callback which ends the stream as well as the reservations stream function
writeNProperties(20, writeProperties, 'ascii', () => {
  writeProperties.end();
}, reservations.writeNReservations);

