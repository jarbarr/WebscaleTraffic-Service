\c postgres

DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

\c calendar

DROP TABLE IF EXISTS properties;

-- Account for addition of cleaning fee and service fee in new seed.js file
-- consider additional variables for holiday pricing
-- consider the ability to modify pricing
  -- add to model functions

CREATE TABLE  IF NOT EXISTS properties (
  property_id SERIAL PRIMARY KEY NOT NULL,
  nightly_fee SMALLINT NOT NULL,
  rating DECIMAL(3, 2),
  reviews SMALLINT NOT NULL,
  minimum_stay SMALLINT NOT NULL,
  maximum_guest SMALLINT NOT NULL,
  cleaning_fee SMALLINT NOT NULL,
  service_fee SMALLINT NOT NULL
);

DROP TABLE IF EXISTS reservations;

-- id will need to be consistent throughout booked dates just like room id
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  booking_id SMALLINT NOT NULL,
  property_id INT NOT NULL,
  booked_date DATE NOT NULL,
  FOREIGN KEY (property_id) REFERENCES properties ON DELETE CASCADE
);