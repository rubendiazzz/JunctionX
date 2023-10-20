const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());

let db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT image FROM users WHERE username = ? AND password = ?`;
  
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    if (row) {
      return res.json({ image: row.image });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  });
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:5000/');
});

