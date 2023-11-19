import React from 'react';

const NotFoundPage = () => {
  return (
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Error 404 - Página no encontrada</title>
        <style>
          {`
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #000;
              color: #fff;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
            }

            .container {
              max-width: 400px;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
              background-color: #333;
            }

            h1 {
              color: #A54BCF;
            }

            p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 25px;
              color: #ddd;
            }

            a {
              color: #3498db;
              text-decoration: none;
              font-weight: bold;
            }

            a:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <h1>Error 404 - Página no encontrada</h1>
          <p>Lo sentimos, la página que estás buscando no se encuentra disponible.</p>
          <p>Vuelve a la <a href="/">página de inicio</a> o intenta buscar algo más.</p>
        </div>
      </body>
    </html>
  );
};

export default NotFoundPage;