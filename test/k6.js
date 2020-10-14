/* eslint-disable */
import http from 'k6/http';
import { check, sleep } from 'k6';
import {Rate} from 'k6/metrics';

// export let errorRate = new Rate("errors")

export let options = {
  vus: 100,
  duration: "1s",
};

export default function() {
  // let property_id = 6
  let property_id = Math.floor(Math.random()* (9000000));
  // let get = {
  //   method: 'GET',
  //   url: `http://localhost:3021/properties/${property_id}/reservations`
  // };
  let post = {
    method: 'POST',
    url: `http://localhost:3021/properties/${property_id}/reservations`,
    body: {
      property_id: `${property_id}`,
      check_in: '2020-10-15',
      check_out: '2020-10-20'
    },
    params: {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  };

  // let responses = http.batch([get, post]);
  let res = http.post(`http://localhost:3021/properties/${property_id}/reservations`);
  check(res, { 'status was 201': r => r.status == 201 });
  sleep(1);
}



// export let options = {
//   vus: 400,
//   duration: '10s'
// }

// export default function () {
//   let req1 = {
//     method: 'GET',
//     url: 'http://localhost:3002/properties/3/',
//   };
//   let req2 = {
//     method: 'POST',
//     url: `http://localhost:3002/reservations/3/`,
//     body: {
//       check_in: '2020-12-20',
//       check_out: '2020-12-25'
//     },
//     params: {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     },
//   };
//   let responses = http.batch([req1, req2]);
// }

// export const options = {
//   stages: [
//     { duration: '10s', target: 100 },
//     { duration: '5s', target: 500 },
//     { duration: '10s', target: 1000 },
//     { duration: '30s', target: 1500 },
//   ],
// };

// export default function() {
//   const property_id = Math.floor(Math.random() * 10000000);
//   let res = http.get(`http://localhost:3021/properties/${property_id}/reservations`);
//   check(res, { 'status was 200': r => r.status == 200 });
//   sleep(1);
// }