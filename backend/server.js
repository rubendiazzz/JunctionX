const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database('./database.sqlite');
const saltRounds = 10;
const cors = require('cors');

app.use(express.json());
app.use(cors());
// Crear la tabla si no existe
db.run("CREATE TABLE if not exists user (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

app.post('/register', (req, res) => {
    const { username, password } = req.body;
	console.log(req);
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ error: 'Error hasheando la contraseña' });
            return;
        }

        const stmt = db.prepare("INSERT INTO user (username, password) VALUES (?, ?)");
        stmt.run(username, hashedPassword, function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ userId: this.lastID });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM user WHERE username = ?", [username], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        if (row) {
            bcrypt.compare(password, row.password, (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Error al verificar la contraseña' });
                    return;
                }
                
                if (result) {
                    res.json({ message: 'Login exitoso' });
                } else {
                    res.status(400).json({ error: 'Contraseña incorrecta' });
                }
            });
        } else {
            res.status(400).json({ error: 'Usuario no encontrado' });
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Capturar el cierre de la aplicación para cerrar la base de datos
process.on('SIGINT', () => {
    db.close();
    process.exit();
});
