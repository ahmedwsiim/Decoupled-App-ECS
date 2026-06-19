const express = require('express');
const cors = require('cors');
const notesRoutes = require('./routes/notes');
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

// Initialize Database Table with retries
const initDB = async (retries = 5) => {
  while (retries) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS notes (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          content TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Database initialized successfully.');
      break;
    } catch (error) {
      console.error(`Error initializing database, retries left: ${retries - 1}`, error.message);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
initDB();

app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
