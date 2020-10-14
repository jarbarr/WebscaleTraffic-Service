# CRUD API Operations #

## GET ##
> room reservation info

### endpoint ###
>/rooms/:room_id/reservations

### Path Parameters ###
> room_id: 'id'

### Success Status Code: ###
> 200


### Response ###

Format:
> array of JSON objects with the following properties:
    [
      {
      "nightly_fee": "Number",
      "rating": "Number",
      "reviews": "Number",
      "minimum_stay": "Number",
      "maximum_guest": "Number",
      "id": "Number",
      "booked_date": "Date"
      }
    ]

## POST ##
>Schedule Reservations

### endpoint: ###
>/rooms/:room_id/reservations

### Path Parameters ###
> room_id: 'id'

### Success Status Code: ###
> 201

### Request Body ###
Expects JSON with the following keys:

    {
      "check_in": "Date",
      "check_out": "Date"
    }



## PUT ##
>Update reservation

### endpoint: ###
>/rooms/:room_id/reservations/:reservation_id

### Path Parameters ###
> room_id: 'id'

>reservation_id: 'id'

### Success Status Code: ###
>204

Request Body: Expects JSON with any of the following keys (include only keys to be updated)

    {
      "check_in": "Date",
      "check_out": "Date"
    }


## DELETE ##
Delete reservation

### endpoint ###
>/rooms/:room_id/reservations/:reservationid

### Path Parameters ###
> room_id: 'id'

>reservation_id: 'id'

### Success Status Code: ###
>204

Request Body: Expects JSON with any of the following keys (include only keys to be updated)

    {
      "check_in": "Date",
      "check_out": "Date"
    }

