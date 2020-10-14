-- \c postgres

-- DROP DATABASE IF EXISTS calendar;

-- CREATE DATABASE calendar;

\c calendar

-- DROP TABLE IF EXISTS properties CASCADE;

-- Account for addition of cleaning fee and service fee in new seed.js file
-- consider additional variables for holiday pricing
-- consider the ability to modify pricing
  -- add to model functions

-- CREATE TABLE properties (
--   property_id SERIAL PRIMARY KEY NOT NULL,
--   cleaning_fee SMALLINT NOT NULL,
--   maximum_guests SMALLINT NOT NULL,
--   minimum_stay SMALLINT NOT NULL,
--   nightly_fee SMALLINT NOT NULL,
--   rating DECIMAL(3, 2),
--   reviews SMALLINT NOT NULL,
--   service_fee SMALLINT NOT NULL,
--   subtotal SMALLINT NOT NULL
-- );

-- DROP TABLE IF EXISTS reservations;

-- -- id will need to be consistent throughout booked dates just like room id
-- CREATE TABLE reservations (
--   reservation_id SMALLINT NOT NULL,
--   reservation_num SMALLINT NOT NULL,
--   property_id INT NOT NULL,
--   total INT NOT NULL,
--   guests SMALLINT,
--   checkin_date DATE NOT NULL,
--   checkout_date DATE NOT NULL,
--   PRIMARY KEY (reservation_id),
--     FOREIGN KEY(property_id)
--     REFERENCES properties(property_id)
--     ON DELETE CASCADE
-- );

-- DROP TABLE IF EXISTS properties;

-- id will need to be consistent throughout booked dates just like room id
-- CREATE TABLE properties (
--   property_id INT NOT NULL,
--   reservation_id SMALLINT NOT NULL,
--   checkin_date DATE NOT NULL,
--   checkout_date DATE NOT NULL,
--   cleaning_fee SMALLINT NOT NULL,
--   guests SMALLINT,
--   maximum_guests SMALLINT NOT NULL,
--   minimum_stay SMALLINT NOT NULL,
--   nightly_fee SMALLINT NOT NULL,
--   rating DECIMAL(3, 2),
--   reviews SMALLINT NOT NULL,
--   service_fee SMALLINT NOT NULL,
--   subtotal SMALLINT NOT NULL,
--   total INT NOT NULL
-- );

-- INSERT INTO properties