export const configuration = () => {
  return {
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
    mailer: {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      email_from: process.env.EMAIL_FROM,
    },
    app_base_url: process.env.APP_BASEURL,
  }
}
