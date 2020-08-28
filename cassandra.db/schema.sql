DROP KEYSPACE IF EXISTS calendar;

CREATE KEYSPACE calendar
WITH replication = {
  'class' : 'SimpleStrategy', 'replication_factor': '1'
};

USE calendar;

CREATE TABLE rooms (
  room_id int,
  nightly_fee smallint,
  rating decimal,
  reviews smallint,
  minimum_stay smallint,
  maximum_guest smallint,
  clearning_fee smallint,
  service_fee smallint,
  PRIMARY KEY (room_id)
);

CREATE TABLE reservations (
  reservation_id int,
  room_id int,
  booked_date date,
  PRIMARY KEY (id),
);
