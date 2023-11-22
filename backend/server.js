import express from "express";
const app = express();
import cors from 'cors';
import mercadopago from "mercadopago";
import mysql from 'mysql2';

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'yeezymusic'
});

conexion.connect(function (error) {
  if (error) {
      console.log("Error en la bd")
  } else {
      console.log("conectado exitosamente")
  }
});

mercadopago.configure({
  access_token: "TEST-8513368391382688-111122-3402db45405f9ca9699ca9b5e053b0bc-703814894"
});

app.get("/", function (req, res) {
  res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:3000/pago",
      failure: "http://localhost:3000/pago",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get('/api/genius-search', async (req, res) => {
  const { q } = req.query;
  const accessToken = 'Tu_Clave_de_API_de_Genius';

  try {
    const response = await axios({
      method: 'get',
      url: `https://api.genius.com/search?q=${encodeURIComponent(q)}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al realizar la solicitud a la API de Genius:', error);
    res.status(500).json({ error: 'Error al obtener datos de Genius' });
  }
});


app.post('/api/facebook', (peticion, respuesta) => {
  const sql = "SELECT * FROM users WHERE correo_electronico = ? AND contrasenia = ? AND estatus = 1";
  console.log(peticion.body);
  conexion.query(sql, [peticion.body.correo_electronico, peticion.body.contrasenia], (error, resultado) => {
      if (error) return respuesta.json({ mensaje: "error" });

      if (resultado.length > 0) {
          // Generar el token JWT con la información del usuario
          const usuarios =resultado[0];
          const token = jwt.sign({ usuario: 'administrador' }, 'coto', { expiresIn: '1d' });
          
          // Enviar el token en la respuesta en el campo 'token'
          respuesta.setHeader('Set-Cookie', `token=${token}`)
          return respuesta.json({ 
            Estatus: "CORRECTO",
             Usuario: token,
            usuariosId:usuarios.id });
      } else {
          return respuesta.json({ Estatus: "ERROR", Error: "Usuario o contraseña incorrecta" });
      }
  });
});

app.post('/api/google', (req, res) => {
  const userData = req.body;
  // Puedes realizar la inserción en la base de datos aquí
  // Por ejemplo:
  const sql = 'INSERT INTO google_users (id, name, email) VALUES (?, ?, ?)';
  db.query(sql, [userData.id, userData.name, userData.email], (err, result) => {
    if (err) {
      console.error('Error al insertar datos de Google: ' + err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos de Google insertados correctamente');
      res.status(200).send('Datos de Google insertados correctamente');
    }
  });
});

// Ruta para almacenar datos de Facebook
app.post('/login', (req, res) => {
  const userData = req.body;
  // Puedes realizar la inserción en la base de datos aquí
  // Por ejemplo:
  const sql = 'INSERT INTO facebook_users (id, name, email) VALUES (?, ?, ?)';
  db.query(sql, [userData.id, userData.name, userData.email], (err, result) => {
    if (err) {
      console.error('Error al insertar datos de Facebook: ' + err.message);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos de Facebook insertados correctamente');
      res.status(200).send('Datos de Facebook insertados correctamente');
    }
  });
});



app.listen(8082, () => {
  console.log("the server is now running on port 8082");
});



