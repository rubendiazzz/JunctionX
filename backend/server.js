const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');
const session = require('express-session');

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

// Configuración CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(session({
  secret: '0f50790cb6c201febf605ad718186bec887862f32c3ef17acb945533555e17c3303467e41c0f3043a1de62f84ab96be1ae4c6b314fb0be01b62c010104520109',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

db.run("CREATE TABLE if not exists user (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
db.run("CREATE TABLE if not exists images (id INTEGER PRIMARY KEY, url TEXT, user_id INTEGER)");

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
};

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
			req.session.userId = row.id;
			console.log("User ID set in session:", req.session.userId);  // Añadir este log
			res.json({ message: 'Login exitoso', session: req.session });
		}
		else {
          res.status(400).json({ error: 'Contraseña incorrecta' });
        }
      });
    } else {
      res.status(400).json({ error: 'Usuario no encontrado' });
    }
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  console.log("Entrando al método de carga");
  console.log("Session Data:", req.session);  // Añadir este log
  if (!req.session.userId) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  if (req.file) {
    console.log("Archivo recibido:", req.file);
    const userId = req.session.userId;
    const stmt = db.prepare("INSERT INTO images (url, user_id) VALUES (?, ?)");
    stmt.run(`uploads/${req.file.filename}`, userId, function(err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        imageUrl: `uploads/${req.file.filename}`,
        imageId: this.lastID
      });
    });
  } else {
    console.log("Error: No se recibió archivo");
    res.status(400).json({ error: 'No se pudo subir la imagen' });
  }
});

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

process.on('SIGINT', () => {
  db.close();
  process.exit();
});
