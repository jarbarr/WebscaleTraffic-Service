# CRUD API Operations #

## GET ##

### goal ###
get room reservation info

[endpoint]:
`/rooms/:room_id/reservation`

#### Request ####
Params:
> room_id: 'id'

**Status Codes**
> success: 200
> error: 404

#### Response ####

**Format**
> JSON

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

### goal ###
Schedule Reservation

[endpoint]
`/rooms/:room_id/reservation`

**Status Codes**
> success: 201
> error: 400

#### Request ####

Body: JSON object

    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "googleMap": "String location",
      "cost": "Number"
    }

#### Response ####

<!-- Update restaurant info
PATCH /api/restaurant/:id
Path Parameters:

id restaurant id
Success Status Code: 204

Request Body: Expects JSON with any of the following keys (include only keys to be updated)

    {
      "name": "String",
      "address": "String",
      "phone": "String",
      "website": "String",
      "cost": "Number"
    }
Delete restaurant
DELETE /api/restaurant/:id
Path Parameters:

id restaurant id
Success Status Code: 204

Add image to restaurant
POST /api/restaurants/:restaurantId/images
Path Parameters:

restaurantId restaurant id
Success Status Code: 201

Request Body: Expects JSON with the following keys.

    {
      "user": "String",
      "image": "image URL",
      "description": "String",
      "posted": "YYYY-MM-MM",
      "googleMap": "String location",
      "category": "String",
      "restaurant": "id Number",
      "cost": "Number"
    } -->