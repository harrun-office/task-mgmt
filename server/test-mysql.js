// test-mysql.js
require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    console.log('Trying to connect to:', process.env.DB_HOST, process.env.DB_PORT);
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      connectTimeout: 60000,
    });

    console.log('✅ Connected from Node.js!');
    await conn.end();
  } catch (e) {
    console.error('❌ Node cannot connect:');
    console.error(e);
  }
})();
