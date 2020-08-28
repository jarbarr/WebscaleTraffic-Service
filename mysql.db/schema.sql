DROP DATABASE IF EXISTS calendar;

CREATE DATABASE calendar;

USE calendar;

CREATE TABLE properties (
  property_id INT NOT NULL AUTO_INCREMENT,
  nightly_fee SMALLINT NOT NULL,
  rating DECIMAL(3,2),
  reviews SMALLINT,
  minimum_stay TINYINT NOT NULL,
  maximum_guest TINYINT NOT NULL,
  PRIMARY KEY (property_id)
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  property_id INT NOT NULL,
  booked_date DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (property_id) REFERENCES properties(property_id)
);
