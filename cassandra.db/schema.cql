-- DROP KEYSPACE IF EXISTS calendar;

-- CREATE KEYSPACE calendar
-- WITH replication = {
--   'class' : 'SimpleStrategy', 'replication_factor': '1'
-- };

USE calendar;

CREATE TABLE properties_by_id (
  property_id int,
  nightly_fee smallint,
  rating decimal,
  reviews smallint,
  minimum_stay smallint,
  maximum_guests smallint,
  cleaning_fee smallint,
  service_fee smallint,
  subtotal smallint,
  reservation_id int,
  guests smallint,
  total smallint,
  checkin_date date,
  checkout_date date,
  PRIMARY KEY (property_id, rating, subtotal)
);




-- CREATE TABLE properties_by_id (
--   property_id int,
--   nightly_fee smallint,
--   minimum_stay smallint,
--   maximum_guest smallint,
--   clearning_fee smallint,
--   subtotal smallint,
--   service_fee smallint,
--   PRIMARY KEY (property_id)
-- );
-- CREATE TABLE properties_by_rating (
--   property_id int,
--   rating decimal,
--   reviews smallint,
--   PRIMARY KEY (rating)
-- );

-- CREATE TABLE reservations (
--   reservation_id int,
--   property_id int,
--   guests smallint,
--   checkin_date date,
--   checkout_date date,
--   total smallint,
--   PRIMARY KEY (reservation_id, checkin_date, checkout_date, total)
-- );


