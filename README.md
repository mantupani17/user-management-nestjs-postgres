## User Management with Ingestion

Backend service using NestJS to manage user authentication,
document management, and ingestion controls.

- Authentication APIs: Register, login, logout, and handle user roles
  (admin, editor, viewer).
- User Management APIs: Admin-only functionality for managing user
  roles and permissions.
- Document Management APIs: CRUD operations for documents,
  including the ability to upload documents.
- Ingestion Trigger API: Allows triggering the ingestion process in the
  Python backend, possibly via a webhook or API call.
- Ingestion Management API: Tracks and manages ongoing ingestion
  processes👍

### Used Libraries/Packages

- Authorization and Authentication Libraries
  - Jsonwebtoken, CASL, Passportjs, csurf, throttlerjs, cookie-parser, helmet
- ORM librariers
  - typeorm, pg, mongoose
- Utility Libraries
  - uuid, class-validator, winston, nodemailer, axios, csv-parser, class-transformer, mime-types etc.
- Documentation Library
  - Swagger
- Mentaining Code Quality
  - Eslint, Prettier, lint-staged
- Running Pre-github hooks
  - husky
- Testing library
  - jest
- Queue Service
  - kafkajs

## Run With Docker

- docker-compose up --build

## Run in Local

- npm install
- Create a database in postgres
- Setup the env vars create a file .env in the project folder
  `
  PORT=3009
  DATABASE_HOST=db
  DATABASE_PORT=5432
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=yourPassword
  DATABASE_NAME=user_management
  DATABASE_DEBUG=false
  JWT_SECRET=mysecretkey
  JWT_EXPIRES_IN=1d
  UPLOAD_DIR=uploads
  DATA_DIR=data
  INGESTION_API=https://jsonplaceholder.typicode.com/
  RUN_INGESTION_CRON=false

  EMAIL_HOST=
  EMAIL_PORT=
  EMAIL_USER=
  EMAIL_PASS=
  EMAIL_FROM=

  APP_BASEURL=http://localhost:3000

  REDIS_HOST=redis
  REDIS_PORT=6379
  THROTTLE_TTL=60000
  THROTTLE_LIMIT=3
  MONGO_URI=mongodb://mongodb:27017
  MONGO_DB=ingestion_db
  REQUEST_PAYLOAD_SIZE=1mb
  COOKIE_DOMAIN=localhost,example.com
  PARENT_COOKIE_DOMAIN=localhost
  KAFKA_HOST=kafka:9092
  KAFKA_TOPIC=example-topic
  KAFKA_CONSUMER_GROUP=example-group
  KAFKA_CONSUMER=example-consumer
- npm run start:dev
- Api Docs http://localhost:3000/api-docs
