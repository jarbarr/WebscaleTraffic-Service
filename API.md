# CRUD API Operations #

## GET ##
> room reservation info

### endpoint ###
>/rooms/:room_id/reservation

### Path Parameters ###
> room_id: 'id'

### Success Status Code: ###
> 200


### Response ###

Format:
> JSON object
Properties:

    {
    "nightly_fee": "Number",
    "rating": "Number",
    "reviews": "Number",
    "minimum_stay": "Number",
    "maximum_guest": "Number",
    "id": "Number",
    "booked_date": "Date"
    }

## POST ##
>Schedule Reservation

### endpoint: ###
>/rooms/:room_id/reservation

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
>/rooms/:room_id/reservation/:reservation_id

### Path Parameters ###
> room_id: 'id'

>reservation_id: 'id'

### Success Status Code: ###
>200

Request Body: Expects JSON with any of the following keys (include only keys to be updated)

    {
      "check_in": "Date",
      "check_out": "Date"
    }


## DELETE ##
Delete reservation

### endpoint ###
>/api/restaurant/:id

### Path Parameters ###
> room_id: 'id'

>reservation_id: 'id'

### Success Status Code: ###
>202

