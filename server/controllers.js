// const csql = require('../cassandra.db/model.js');
const psql = require('../postgresql.db/model.js');
/* eslint-disable */

module.exports = {
  getProperty: (req, res) => {
    psql.getProperties(req.params, (err, results) => {
      if (err) {
        // Console.log('Failed to get data from databases: ', err);
        // Console.log(':*(');
        res.status(404).send(err);
      } else {
        // Console.log('Succeed to get data from databases', results);
        // Console.log('get works :*) ');
        res.status(200).send(results);
      }
    });
  },

  addReservation: (req, res) => {
    // console.log(req.body);
    psql.addReservation(req.body, (err) => {
      if (err) {
        // Console.log(`Failed to insert data to
        //  reservations table where property id = ${req.params.property_id}:`, err);
        // Console.log('post no work');
        res.status(400).send(err);
      } else {
        // Console.log(`Success to insert data
        // to reservations table where property id = ${req.params.property_id}`);
        // Console.log('post works', results);
        res.status(201).send();
      }
    });
  },

  updateReservation: (req, res) => {
    psql.updateReservation(req.body, (err) => {
      // Console.log(req.body);
      if (err) {
        // Console.log(`Failed to insert data to
        //  reservations table where property id = ${req.params.property_id}:`, err);
        // Console.log('post no work');
        res.status(404).send(err);
      } else {
        // Console.log(`Success to insert data
        // to reservations table where property id = ${req.params.property_id}`);
        // Console.log('post works', results);
        res.status(200).send();
      }
    });
  },

  deleteReservations: (req, res) => {
    psql.deleteReservation(req.body, (err) => {
      // Console.log(req.body);
      if (err) {
        // Console.log(`Failed to insert data to
        //  reservations table where property id = ${req.params.property_id}:`, err);
        // Console.log('post no work');
        res.status(404).send(err);
      } else {
        // Console.log(`Success to insert data
        // to reservations table where property id = ${req.params.property_id}`);
        // Console.log('post works', results);
        res.status(202).send();
      }
    });
  },

};
