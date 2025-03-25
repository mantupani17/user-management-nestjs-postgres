export const configuration = () => {
  return {
    app_port: process.env.PORT || 3000,
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'myuser',
      password: process.env.DATABASE_PASSWORD || 'mypassword',
      database: process.env.DATABASE_NAME || 'user_management',
      logging: process.env.DATABASE_DEBUG === 'true',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'mysecretkey',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    upload: {
      dir: process.env.UPLOAD_DIR || 'uploads',
      dataDir: process.env.DATA_DIR || 'data',
    },
    ingestion_api_url: process.env.INGESTION_API,
    run_ingestion_cron: process.env.RUN_INGESTION_CRON,
    run_sync_clean_keypair: process.env.RUN_SYNC_CLEAN_CRON,
    mailer: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      email_from: process.env.EMAIL_FROM,
    },
    app_base_url: process.env.APP_BASEURL,
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    throttle: {
      ttl: process.env.THROTTLE_TTL,
      limit: process.env.THROTTLE_LIMIT,
    },
    mongo_config: {
      uri: process.env.MONGO_URI,
      db: process.env.MONGO_DB,
    },
    request_limit: process.env.REQUEST_PAYLOAD_SIZE,
    allowed_cookie_hosts: process.env.COOKIE_DOMAIN.split(','),
    parent_cookie_domain: process.env.PARENT_COOKIE_DOMAIN,
    kafka: {
      host: process.env.KAFKA_HOST,
      topic: process.env.KAFKA_TOPIC,
      consumer: process.env.KAFKA_CONSUMER || 'example-consumer',
      consumer_group: process.env.KAFKA_CONSUMER_GROUP,
    },
    secrets: {
      public: process.env.PUBLIC_KEY.replace(/\\n/g, '\n').replace(/\\/g, ''),
      private: process.env.PRIVATE_KEY.replace(/\\n/g, '\n').replace(/\\/g, ''),
    },
  }
}
