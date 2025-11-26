// server.js (or backend/server.js, whatever the main file is)
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

// Import models so Sequelize knows them
require('./models/User');
require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// simple health check
app.get('/api', (req, res) => {
  res.send('server started');
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

(async () => {
  try {
    // test DB connection
    await sequelize.authenticate();
    console.log('DB connected successfully ✔️');

    // sync models (be careful with force/alter in production)
    await sequelize.sync();
    console.log('📦 Models synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database startup error ❌');
    console.error(err);
    process.exit(1);
  }
})();
