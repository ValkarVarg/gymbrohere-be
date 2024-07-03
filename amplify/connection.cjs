const { Pool } = require('pg');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/.env.${ENV}`,
});


const rdsHost = process.env.RDS_HOST;
const databaseName = process.env.RDS_DATABASE_NAME;
const username = process.env.RDS_USERNAME;
const password = process.env.RDS_PASSWORD;


const config = {}

if (ENV === 'production') {
  config.host= rdsHost,
  config.database = databaseName,
  config.user= username,
  config.password= password}

// if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
//   throw new Error('PGDATABASE or DATABASE_URL not set');
// }

module.exports = new Pool(config);