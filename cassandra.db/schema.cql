DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE calendar
WITH replication = {
  'class' : 'SimpleStrategy', 'replication_factor': '1'
};

USE calendar;

CREATE TABLE properties_by_id (
  property_id int,
  nightly_fee smallint,
  minimum_stay smallint,
  maximum_guest smallint,
  clearning_fee smallint,
  service_fee smallint,
  PRIMARY KEY (property_id)
);
CREATE TABLE properties_by_rating (
  property_id int,
  rating decimal,
  reviews smallint,
  subtotal smallint,
  PRIMARY KEY (rating)
);

CREATE TABLE reservations_by_id (
  reservation_id int,
  booked_date date,
  guests int,
  subtotal,
  PRIMARY KEY (reservation_id, booked_date, ),
);

CREATE TABLE reservations_by_property (
  property_id int,
  reservation_id int,
  checkin_date date,
  checkout_date date,
  total int,
  PRIMARY KEY (property_id, reservation_id, checkin_date, total),
);
