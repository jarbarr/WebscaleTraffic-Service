const faker = require('faker');

/* eslint-disable */
module.exports = {
  writeProperties: (id) => {
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
    let reviews = faker.random.number({ min: 5, max: 200 }); // between 5 and 300 reviews
    let minimum_stay = faker.random.number({ min: 1, max: 7 }); // between 1 and 3 nights
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

    let propertiesObj = { id, nightly_fee, rating, reviews, minimum_stay, maximum_guest, cleaning_fee, service_fee, subTotal };
    return propertiesObj
  }
}
