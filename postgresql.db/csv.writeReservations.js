// const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

// inputs: property object with id, subtotal, min stay, max guests
// outputs: all the lines of the csv for that property
/* eslint-disable */
module.exports = {
  writeNReservations: (i, j, id, obj, writer, numOfReservations, encoding, callback) => {
    // let reservationsData = `reservations_id, property_id, booked_date, total, guests \n`;
    // generate a random number of reservations per property
    let count = i;
    function write() {
      let ok = true;
      do {


        // generate a random number of reservations per property
        // let numOfReservations = faker.random.number({ min: 1, max: 3 });
        // iterate over each reservation

          // console.log(id)
          // generate a random reservations id per reservation
          let reservation_id = faker.random.number({ min: 10000, max: 20000 });
          let reservationNum = j;
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
          let lengthOfStay = faker.random.number({ min: 1, max: 5 }) + obj.minStay;
          let checkoutDate = moment(checkinDate).add(lengthOfStay, 'days').format('YYYY-MM-DD');
          // generate total per reservation
          let total = obj.subTotal * lengthOfStay;
          // generate number of guests per reservation
          let guests = faker.random.number({ min: 0, max: obj.maxGuest });
          // iterate over each day of each reservation
          let reservationsData = `${reservation_id},${reservationNum},${id},${checkinDate},${checkoutDate},${total},${guests}\n`;
          // console.log(reservationsData)
          if (count === 0 && numOfReservations) {
            writer.write(reservationsData, encoding, callback);
          } else {
            ok = writer.write(reservationsData, encoding);
          }


      } while (count > 0 && ok);
      if (count > 0) {
        writer.once('drain', write);
      }
    }
    write();
  }
}

