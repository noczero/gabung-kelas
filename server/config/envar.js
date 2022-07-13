require('dotenv').config();

export const envar = {
  app: {
    name: 'Gabung Kelas: Situs Belajar Mengajar Kelas Daring',
    apiURL: `${process.env.BASE_SERVER_URL}/${process.env.BASE_API_URL_PREFIX}`,
    serverURL: process.env.BASE_SERVER_URL,
    clientURL: process.env.BASE_CLIENT_URL,
    apiPrefix: process.env.BASE_API_URL_PREFIX
  },
  port: process.env.PORT || 8080,
  database: {
    url: process.env.MONGO_URI
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: '7d'
  },
  mail: {
    SMTP_HOST: process.env.MAIL_SMTP_HOST,
    SMTP_PORT: process.env.MAIL_SMTP_PORT,
    SMTP_AUTH_USER: process.env.MAIL_SMTP_AUTH_USER,
    SMTP_AUTH_PASS: process.env.MAIL_SMTP_AUTH_PASS
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME
  }
};
