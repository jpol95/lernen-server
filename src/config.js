module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DATABASE_URL
    || 'postgresql://dundermiffling:1Pepperm%40n@localhost/lernen',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
