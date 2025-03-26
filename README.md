# BMyRoamie API 🏠

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## .env File

This is an example to implement a .env file for out docker-compose and database connection

```
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
DATABASE_NAME=mydatabase
POSTGRES_PORT=5432
CONTAINER_NAME=my-postgres-db
```

## Features

* Auth with JWT and OTP verifications (MFA)
* REST API, CRUD for every entity
* PostgreSQL Dockerization

## Roles

* 1: User
* 2: Admin

## Status

* 1: Active
* 2: Inactive
* 3: Deleted
* 4: Banned

## CRUD

* User ✅
* Personality ✅
* UserPersonality
* Interest ✅
* UserInterest
* Ad ✅
* State ✅
* Municipality ✅
* Favorite
* Rule ✅
* Amenity ✅
* AdAmenity
* Image
