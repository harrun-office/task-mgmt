// backend/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_NAME =
  process.env.DB_NAME ||
  process.env.MYSQL_DATABASE ||
  process.env.MYSQLDATABASE;

const DB_USER =
  process.env.DB_USER ||
  process.env.MYSQLUSER;

const DB_PASS =
  process.env.DB_PASS ||
  process.env.MYSQL_ROOT_PASSWORD ||
  process.env.MYSQLPASSWORD;

const DB_HOST =
  process.env.DB_HOST ||
  process.env.MYSQLHOST; // on Railway, this is the private domain

const DB_PORT =
  Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);

console.log('Using DB config:', { DB_HOST, DB_PORT, DB_NAME, DB_USER });

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
  dialectOptions: {
    connectTimeout: 60000,
    // Uncomment if Railway requires SSL
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
});

module.exports = sequelize;
