const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.get('/category', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM category');
    res.json(categories.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/item', async (req, res) => {
  try {
    const { query } = req.query;
    const items = await pool.query(query);
    res.json(items.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/item', async (req, res) => {
  try {
    const { item_name, category_id, location } = req.body;
    await pool.query(
      'INSERT INTO item (item_name, category_id, location) VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326))',
      [item_name, category_id, location.coordinates[0], location.coordinates[1]]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});