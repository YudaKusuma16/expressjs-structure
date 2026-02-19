const env = process.env;
const fs = require('fs');
const db = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME || 'express_ecommerce',
  port: env.DB_PORT || 3306,
};

if (env.DB_SSL_CA_PATH) {
  db.ssl = {
    mode: 'VERIFY_IDENTITY',
    ca: fs.readFileSync(env.DB_SSL_CA_PATH, 'utf-8'),
  };
}

module.exports = db;