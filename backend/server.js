import express from "express";
const app = express();
import cors from 'cors';
import mercadopago from "mercadopago";
app.use(express.json());
app.use(cors());

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

app.listen(8082, () => {
  console.log("the server is now running on port 8080");
});
