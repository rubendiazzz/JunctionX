const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const app = express();
const db = new sqlite3.Database('./database.sqlite');
const saltRounds = 10;
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Create the table if it doesn't exist
db.run("CREATE TABLE if not exists user (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
db.run("CREATE TABLE if not exists images (id INTEGER PRIMARY KEY, url TEXT)");

app.post('/register', (req, res) => {
    const { username, password } = req.body;
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

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({
            imageUrl: `uploads/${req.file.filename}`
        });
    } else {
        res.status(400).json({ error: 'No se pudo subir la imagen' });
    }
});

// Nuevo endpoint para procesar la imagen
app.post('/process-image', (req, res) => {
    const { imageUrl } = req.body;
    const stmt = db.prepare("INSERT INTO images (url) VALUES (?)");
    stmt.run(imageUrl, function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: "Imagen recibida y almacenada con éxito.", imageId: this.lastID });
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
