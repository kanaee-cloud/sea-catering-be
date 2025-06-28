# Sea Catering Backend

This is the backend for the Sea Catering application. It is built with Node.js, Express, and Prisma.

## Features

* User authentication and authorization
* Meal planning and subscription management
* API endpoints for frontend to interact with

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the application
4. Run `npm run start` to start the application

## API Endpoints

### User Endpoints

* `POST /users/register`: Register a new user
* `POST /users/login`: Login a user
* `GET /users/me`: Get the current user
* `POST /users/logout`: Logout the current user

### Meal Plan Endpoints

* `GET /mealplans`: Get all meal plans
* `GET /mealplans/:id`: Get a meal plan by id
* `POST /mealplans`: Create a new meal plan
* `PUT /mealplans/:id`: Update a meal plan
* `DELETE /mealplans/:id`: Delete a meal plan

### Subscription Endpoints

* `GET /subscriptions`: Get all subscriptions
* `GET /subscriptions/:id`: Get a subscription by id
* `POST /subscriptions`: Create a new subscription
* `PUT /subscriptions/:id`: Update a subscription
* `DELETE /subscriptions/:id`: Delete a subscription

## Prisma Schema

The Prisma schema is located in `prisma/schema.prisma`. It defines the database schema and models.

## Environment Variables

The following environment variables are required:

* `JWT_SECRET_ACCESS_KEY`: The secret key for generating access tokens
* `JWT_SECRET_REFRESH_KEY`: The secret key for generating refresh tokens
* `DATABASE_URL`: The URL of the database

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
