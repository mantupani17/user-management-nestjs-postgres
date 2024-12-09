## User Management Used Libraries/Packages

- Authorization and Authentication Libraries
    - Jsonwebtoken, CASL, Passportjs

- ORM librariers
    - typeorm, pg

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

## Run With Docker
- docker-compose up --build


## Run in Local
- npm install
- Create a database in postgres
- Setup the env vars create a file .env in the project folder
`
    PORT=3009
    DATABASE_HOST=localhost
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
`
- npm run start:dev
- Api Docs http://localhost:3000/api-docs





