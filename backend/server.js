import express, { query } from "express";
import cors from "cors";
import axios from "axios";
import mysql from "mysql2";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "yeezymusic",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para verificar si un usuario ya existe en la base de datos por correo electrónico
const userExistsByEmail = (table, userEmail, callback) => {
  const sql = `SELECT * FROM ${table} WHERE email = ?`;

  pool.query(sql, [userEmail], (err, result) => {
    if (err) {
      console.error(`Error al verificar usuario en ${table} por email:`, err.message);
      callback(err, false);
    } else {
      // Comprueba si el usuario ya existe
      callback(null, result.length > 0);
    }
  });
};

// Ruta para manejar datos de Google
app.post("/api/google", (req, res) => {
  const userData = req.body;

  // Verificar si el usuario ya existe por correo electrónico antes de la inserción
  userExistsByEmail("google_users", userData.email, (err, exists) => {
    if (err) {
      res.status(500).send("Error interno del servidor");
      return;
    }

    if (exists) {
      console.log("Usuario de Google ya existe en la base de datos");
      res.status(200).send("Usuario de Google ya existe en la base de datos");
    } else {
      // Insertar usuario si no existe
      const sql = "INSERT INTO google_users (id, name, email) VALUES (?, ?, ?)";

      pool.query(sql, [userData.id, userData.name, userData.email], (err, result) => {
        if (err) {
          console.error("Error al insertar datos de Google:", err.message);
          res.status(500).send("Error interno del servidor");
        } else {
          console.log("Datos de Google insertados correctamente");
          res.status(200).send("Datos de Google insertados correctamente");
        }
      });
    }
  });
});

// Ruta para manejar datos de Facebook
app.post("/api/facebook", (req, res) => {
  const userData = req.body;

  // Verificar si el usuario ya existe por correo electrónico antes de la inserción
  userExistsByEmail("facebook_users", userData.email, (err, exists) => {
    if (err) {
      res.status(500).send("Error interno del servidor");
      return;
    }

    if (exists) {
      console.log("Usuario de Facebook ya existe en la base de datos");
      res.status(200).send("Usuario de Facebook ya existe en la base de datos");
    } else {
      // Insertar usuario si no existe
      const sql = "INSERT INTO facebook_users (id, name, email) VALUES (?, ?, ?)";

      pool.query(sql, [userData.id, userData.name, userData.email], (err, result) => {
        if (err) {
          console.error("Error al insertar datos de Facebook:", err.message);
          res.status(500).send("Error interno del servidor");
        } else {
          console.log("Datos de Facebook insertados correctamente");
          res.status(200).send("Datos de Facebook insertados correctamente");
        }
      });
    }
  });
});

app.get("/api/google-users", (req, res) => {
  const sql = "SELECT * FROM google_users";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener usuarios de Google:", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para obtener todos los usuarios de Facebook
app.get("/api/facebook-users", (req, res) => {
  const sql = "SELECT * FROM facebook_users";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener usuarios de Facebook:", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).json(result);
    }
  });
});
app.get("/users", (req, res) => {
  const sql = "SELECT * from users;";

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener usuarios d", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).json(result);
    }
  });
});

app.post("/users", (req, res) => {
  const { nombre, email, nickname, password } = req.body;

  const insertUserQuery = "INSERT INTO users (name, email, nickname, contrasenia) VALUES (?, ?, ?, ?)";
  pool.query(insertUserQuery, [nombre, email, nickname, password], (err, result) => {
    if (err) {
      console.error("Error al insertar usuario:", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(201).send("Usuario insertado correctamente");
    }
  });
});

app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { nombre, email, nickname, password } = req.body;

  const updateUserQuery = "UPDATE users SET name = ?, email = ?, nickname = ?, contrasenia = ? WHERE id = ?";
  pool.query(updateUserQuery, [nombre, email, nickname, password, userId], (err, result) => {
    console.log(req.body);
    if (err) {
      console.error("Error al actualizar usuario:", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).send("Usuario actualizado correctamente");
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  const deleteUserQuery = "DELETE FROM users WHERE id = ?";
  pool.query(deleteUserQuery, [userId], (err, result) => {
    if (err) {
      console.error("Error al eliminar usuario:", err.message);
      res.status(500).send("Error interno del servidor");
    } else {
      res.status(200).send("Usuario eliminado correctamente");
    }
  });
});



const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
