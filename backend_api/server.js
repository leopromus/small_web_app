const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint (for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create an item
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description || null]
    );
    
    const [newItem] = await db.query('SELECT * FROM items WHERE id = ?', [result.insertId]);
    res.status(201).json(newItem[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete an item
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM items WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Small App backend running on port ${PORT}`);
});